import express, { Router } from "express";
import { client } from "@repo/db/client";

const router: Router = express.Router();

router.post("/user", async (req, res) => {
  const { email } = req.body;

  try {
    await client.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    res.status(200).json({
      message: "User created or updated successfully",
    });
  } catch (error) {
    console.error("Error upserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
