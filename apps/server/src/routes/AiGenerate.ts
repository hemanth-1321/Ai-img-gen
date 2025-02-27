import { Router } from "express";
import { GenerateImage } from "../types";
import { client } from "@repo/db/client";
import { falAiModel } from "../utils/FalAi";
import { getPresignedGetUrl, getPresignedUrl } from "../utils/S3";
import { authMiddleware } from "../middleware";

const router: Router = Router();

router.post("/presigned-url", async (req, res) => {
  console.log(req.body);
  const { fileName, fileType } = req.body;
  console.log(fileName, fileType);
  if (!fileName || !fileType) {
    res.status(400).json({
      message: "Missing FileName or FileType",
    });
    return;
  }
  try {
    const { uploadURL, filePath } = await getPresignedUrl(
      fileName as string,
      fileType as string,
      "ziped"
    );
    console.log(uploadURL, filePath);
    res.status(200).json({ uploadURL, filePath });
  } catch (error) {
    console.error("error uploading image", error);
    res.status(500).json({
      message: "Error uploading Image",
    });
  }
});

router.post("/generate", authMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log(req.body);
  if (!userId) {
    res.status(400).json({
      message: "UnAuthorized",
    });
    return;
  }
  const parsedBody = GenerateImage.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }

  const model = await client.model.findUnique({
    where: {
      id: parsedBody.data.modelId,
    },
  });
  if (!model || !model.tensorPath) {
    res.status(411).json({
      message: "model not found",
    });
    return;
  }

  const { request_id, response_url } = await falAiModel.genrateImage(
    parsedBody.data.prompt,
    model?.tensorPath
  );

  const data = await client.outPutImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      userId: userId,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
      falAiRequestId: request_id,
      status: "Generated",
    },
  });

  res.status(200).json({
    message: "Image generated successfully",
    imageId: data.id,
  });
});

router.get("/image/bulk", authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;

    console.log("Authenticated user ID:", req.userId);

    // Fetch images that belong to the authenticated user
    const imagesData = await client.outPutImages.findMany({
      where: {
        OR: [
          { userId: req.userId }, // Fetch user's own images
          { model: { userId: req.userId } }, // Fetch images linked to user's models
        ],
      },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    console.log("Fetched Images Data:", imagesData);

    res.json({ images: imagesData });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
