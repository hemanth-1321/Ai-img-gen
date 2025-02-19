import dotenv from "dotenv";
dotenv.config();
import express from "express";
import AiGenerate from "./routes/AiGenerate";
import FalWebHook from "./routes/FalWebHook";

const app = express();
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ai/gen", AiGenerate);
app.use("/fal-ai/webhook", FalWebHook);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
