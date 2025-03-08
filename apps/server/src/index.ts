import dotenv from "dotenv";

dotenv.config();
import express from "express";
import AiGenerate from "./routes/AiGenerate";
import FalWebHook from "./routes/FalWebHook";
import AiTraining from "./routes/Training";
import Packs from "./routes/Pack";
import AuthRouter from "./routes/User";
import PackRouter from "./routes/Pack";
import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", AuthRouter);
app.use("/ai/gen", AiGenerate);
app.use("/ai/train", AiTraining);
app.use("/ai/pack", PackRouter);
app.use("/ai", Packs);
app.use("/fal-ai/webhook", FalWebHook);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
