import express, { Router } from "express";
import { TrainModel } from "../types";
import { client } from "@repo/db/client";
import { falAiModel } from "../utils/FalAi";
import { authMiddleware } from "../middleware";
const router: Router = express.Router();

router.post("/training", authMiddleware, async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  console.log(req.body);
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      res.status(404).json({
        message: "UnAuthorized",
      });
      return;
    }

    if (!parsedBody.success) {
      res.status(400).json({ error: parsedBody.error.message });
      return;
    }

    const { request_id, response_url } = await falAiModel.TrainModel(
        parsedBody.data.zipUrl,
        parsedBody.data.name
    );
    console.log(request_id, response_url);
    const data = await client.model.create({
      data: {
        name: parsedBody.data.name,
        type: parsedBody.data.type,
        age: parsedBody.data.age,
        ethnicity: parsedBody.data.ethnicity,
        eyeColor: parsedBody.data.eyeColor,
        bald: parsedBody.data.bald,
        userId: userId,
        falAiRequestId: request_id,
        zipUrl: parsedBody.data.zipUrl,
      },
    });
    res.status(200).json({
      data,
      modelId: data.id,
      message: "Training created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot create model",
    });
    return;
  }
});

router.get("/models", authMiddleware, async (req, res) => {
  const models = await client.model.findMany({
    where: {
      OR: [{ userId: req.userId }, { open: true }],
    },
  });

  res.json({
    models,
  });
});

export default router;
