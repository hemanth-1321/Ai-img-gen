import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";

export class FalAiModel extends BaseModel {
  constructor() {
    super();
  }

  public async genrateImage(propmt: string, tensorPath: string) {
    // const { request_id, response_url } = await fal.queue.submit(
    //   "fal-ai/flux-lora",
    //   {
    //     input: {
    //       prompt: propmt,
    //       loras: [{ path: tensorPath, scale: 1 }],
    //     },
    //     webhookUrl: `${process.env.BASE_URL}/fal-ai/webhook/image`,
    //   }
    // );
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
}
