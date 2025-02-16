import { Router } from "express";
import { GenerateImageFromPack } from "../types";
import { client } from "@repo/db/client";

const router: Router = Router();

router.post("/pack/generate", async (req, res) => {
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

  const images = await client.outPutImages.createManyAndReturn({
    data: prompts.map((prompt) => ({
      prompt: prompt.prompt,
      userId: "hemanth",
      modelId: parsedBody.data.modelId,
      imageUrl: "",
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
