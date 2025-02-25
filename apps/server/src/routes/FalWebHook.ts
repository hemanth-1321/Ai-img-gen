import { client } from "@repo/db/client";
import express, { Router } from "express";
import { FalAiModel } from "../models/FalAiModel";
import { falAiModel } from "../utils/FalAi";

const router: Router = express();

router.post("/image", async (req, res) => {
  console.log(req.body);

  const request_id = req.body.request_id;

  await client.outPutImages.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.imageUrl,
    },
  });
  res.status(201).json({
    message: "Webhook Recived",
  });
});

router.post("/train", async (req, res) => {
  console.log(req.body);
  const { imageUrl } = await falAiModel.generateImageSync(req.body.tensorPath);

  const request_id = req.body.request_id;

  await client.model.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      trainingStatus: "Generated",
      tensorPath: req.body.tensorPath,
      thumbnail: imageUrl,
    },
  });

  res.status(201).json({
    message: "Webhook Recived",
  });
});

export default router;
