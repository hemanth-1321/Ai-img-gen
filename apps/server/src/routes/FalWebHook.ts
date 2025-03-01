import { client } from "@repo/db/client";
import express, { Router } from "express";
import { FalAiModel } from "../models/FalAiModel";
import { falAiModel } from "../utils/FalAi";
import { fal } from "@fal-ai/client";
const router: Router = express();

router.post("/image", async (req, res) => {
  const request_id = req.body.request_id;
  const images = req.body.payload.images[0].url;
  if (req.body.status === "ERROR") {
    res.status(411).json({
      message: "WebHook-Failed",
    });
    await client.outPutImages.updateMany({
      where: {
        falAiRequestId: request_id,
      },
      data: {
        status: "Failed",
        imageUrl: images,
      },
    });
    return;
  }
  if (!images) {
    res.status(404).json({
      messgae: "images not found",
    });
  }
  await client.outPutImages.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      imageUrl: images,
    },
  });
  res.status(201).json({
    message: "Webhook Recived",
  });
});

router.post("/train", async (req, res) => {
  console.log(req.body);
  const requestId = req.body.request_id as string;
  const result = await fal.queue.result("fal-ai/flux-lora", {
    requestId,
  });

  const { imageUrl } = await falAiModel.generateImageSync(
    //@ts-ignore
    result.data.diffusers_lora_file.url
  );

  await client.model.updateMany({
    where: {
      falAiRequestId: requestId,
    },
    data: {
      trainingStatus: "Generated",
      //@ts-ignore
      tensorPath: result.data.diffusers_lora_file.url,
      thumbnail: imageUrl,
    },
  });

  res.status(201).json({
    message: "Webhook Recived",
  });
});

export default router;
