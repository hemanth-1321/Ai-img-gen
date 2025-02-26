import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";

export class FalAiModel {
  constructor() {}

  public async genrateImage(propmt: string, tensorPath: string) {
    const { request_id, response_url } = await fal.queue.submit(
      "fal-ai/flux-lora",
      {
        input: {
          prompt: propmt,
          loras: [{ path: tensorPath, scale: 1 }],
        },
        webhookUrl: `${process.env.BASE_URL}/fal-ai/webhook/image`,
      }
    );
    return { request_id: "", response_url: "" };
  }

  public async TrainModel(zipUrl: string, triggeredWord: string) {
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
