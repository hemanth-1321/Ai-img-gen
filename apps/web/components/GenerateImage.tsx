"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
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
  const [prompt, setPrompt] = useState("");
  const [models, setModels] = useState<Tmodel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.error("No token received");
          return;
        }
        const response = await axios.get(`${BACKEND_URL}/ai/train/models`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setModels(response.data.models);
        setSelectedModel(response.data.models[0]?.id);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, [getToken]);

  const handleGenerate = async () => {
    const token = await getToken();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/ai/gen/generate`,
        { prompt, modelId: selectedModel, num: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast("Image generated successfully");
      }
    } catch (error) {
      console.error(error);
      toast("Image couldn't be generated");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 md:mt-4">
      <div className="w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Model</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))
            : models.map((model) => (
                <div
                  key={model.id}
                  className={`border p-2 rounded-lg cursor-pointer ${
                    selectedModel === model.id
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <p className="text-xs text-center mt-1">{model.name}</p>
                </div>
              ))}
        </div>
      </div>

      {/* Text Input & Button */}
      <div className="w-full max-w-2xl flex flex-col items-center p-4">
        <Textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate"
          className="w-full min-h-[100px] p-3"
        />
        <Button onClick={handleGenerate} className="mt-4">
          Create Image
        </Button>
      </div>
    </div>
  );
};
