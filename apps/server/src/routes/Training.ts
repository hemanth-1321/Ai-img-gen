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
});

export default router;
