import express, { Router } from "express";
import { TrainModel } from "../types";
import { client } from "@repo/db/client";
const router: Router = express.Router();
router.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.message });
    return;
  }
  const User_Id = "hemanth";
  const data = await client.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: User_Id,
    },
  });
  res.status(200).json({
    modelId: data.id,
    message: "Training created successfully",
  });
});

export default router;
