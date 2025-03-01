import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";

export class FalAiModel {
  constructor() {}
  public async generateImage(prompt: string, tensorPath: string) {
    try {
      const { request_id, response_url } = await fal.queue.submit(
        "fal-ai/flux-lora",
        {
          input: {
            prompt,
            loras: [{ path: tensorPath, scale: 1 }],
          },
          webhookUrl: `${process.env.BASE_URL}/fal-ai/webhook/image`,
        }
      );
      console.log(
        `Generating image, webhook URL: ${process.env.BASE_URL}/fal-ai/webhook/image`
      );
      return { request_id, response_url };
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }

  public async TrainModel(zipUrl: string, triggeredWord: string) {
    console.log("ZipUrl", zipUrl, triggeredWord);
    // const { request_id, response_url } = await fal.queue.submit(
    //   "fal-ai/flux-lora-fast-training",
    //   {
    //     input: {
    //       images_data_url: zipUrl,
    //       trigger_word: triggeredWord,
    //     },
    //     webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
    //   }
    // );
    return { request_id: "", response_url: "" };
  }

  public async generateImageSync(tensorPath: string) {
    const response = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt:
          "Generate a head shot for this user in front of a white background",
        loras: [{ path: tensorPath, scale: 1 }],
      },
    });
    const imageUrl = response?.data?.images?.[0]?.url || null;

    if (!imageUrl) {
      throw new Error("Failed to generate image: No image URL returned");
    }

    return { imageUrl };
  }
}
