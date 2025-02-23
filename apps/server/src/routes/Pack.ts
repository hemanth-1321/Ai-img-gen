import { Router } from "express";
import { GenerateImageFromPack } from "../types";
import { client } from "@repo/db/client";
import { falAiModel } from "../utils/FalAi";
import { authMiddleware } from "../middleware";

const router: Router = Router();

router.post("/pack/generate", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(404).json({
      message: "unAuthorized",
    });
    return;
  }
  const parsedBody = GenerateImageFromPack.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }

  const prompts = await client.packPrompt.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });

  let requestIds: { request_id: string }[] = await Promise.all(
    prompts.map((prompt) =>
      falAiModel.genrateImage(prompt.prompt, parsedBody.data.modelId)
    )
  );
  const images = await client.outPutImages.createManyAndReturn({
    data: prompts.map((prompt, index) => ({
      prompt: prompt.prompt,
      userId: userId,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
      falAiRequestId: requestIds[index]?.request_id,
    })),
  });

  res.status(200).json({
    message: "Images generated successfully",
    images: images.map((image) => image.id),
  });
});

router.get("/pack/bulk", async (req, res) => {
  try {
    const packs = await client.packs.findMany({});
    res.status(200).json({
      packs,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

export default router;
