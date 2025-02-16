import { Router } from "express";
import { GenerateImage } from "../types";
import { client } from "@repo/db/client";

const router: Router = Router();

router.post("/generate", async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }

  const data = await client.outPutImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      userId: "hemanth",
      modelId: parsedBody.data.modelId,
      imageUrl: "",
    },
  });

  res.status(200).json({
    message: "Image generated successfully",
    imageId: data.id,
  });
});

router.get("/image/bulk", async (req, res) => {
  const images = req.query.images as string[];
  const limit = (req.query.limit as string) ?? 10;
  const offset = (req.query.limit as string) ?? 0;
  const imageData = await client.outPutImages.findMany({
    where: {
      id: {
        in: images,
      },
      userId: "hemanth",
    },
    skip: parseInt(offset),
    take: parseInt(limit),
  });

  res.status(200).json({
    images: imageData,
  });
});
export default router;
