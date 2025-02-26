"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
interface Tmodel {
  id: string;
  thumbnail: string;
  name: string;
}

export const GenerateImage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [models, setModels] = useState<Tmodel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [modeLoading, setModelLoading] = useState<Boolean>(true);
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const token = await getToken();
        console.log("token", token);
        if (!token) {
          console.error("No token received");
          return;
        }
        const response = await axios.get(`${BACKEND_URL}/ai/train/models`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setModels(response.data.models);
        setSelectedModel(response.data.models[0]?.id);
        setModelLoading(false);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [getToken]);

  const handleGenerate = async () => {
    const token = await getToken();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/ai/gen/generate`,
        {
          prompt,
          modelId: selectedModel,
          num: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toast("Image generated SuccessFully");
      }
    } catch (error) {
      console.error(error);
      toast("Image Couldnt be Genearted");
    }
  };
  return (
    <div className="h-[60vh] items-center justify-center flex flex-col">
      <div className="max-w-4xl mt-10 mb-2">
        <div className="text-xl">Select Model</div>
        <div className="grid grid-cols-4 gap-4 ">
          {models.map((model) => (
            <div
              key={model.id}
              className={`${selectedModel === model.id ? "border-red-400" : ""}`}
              onClick={() => {
                setSelectedModel(model.id);
              }}
            >
              <img
                src={model.thumbnail}
                alt="thumbnail"
                className="rounded cursor-pointer"
              />
              <p>{model.name}</p>
            </div>
          ))}
          {modeLoading && (
            <div className="flex gap-2 p-4">
              <Skeleton className="max-w-4xl h-40 rounded-full" />
              <Skeleton className="max-w-4xl h-40 rounded-full" />
              <Skeleton className="max-w-4xl h-40 rounded-full" />
              <Skeleton className="max-w-4xl  rounded-full" />
            </div>
          )}
        </div>
      </div>
      <div className="h-[60vh] items-center justify-center flex flex-col">
        <Textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the Image you want to generate"
          className="py-8 px-4 w-2xl"
        />

        <Button onClick={handleGenerate} className="m-4 cursor-pointer">
          Create Image
        </Button>
      </div>
    </div>
  );
};
