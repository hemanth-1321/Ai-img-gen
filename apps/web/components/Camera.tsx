"use client";

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { ImageCard, TImage } from "./ImageCard";
import { Skeleton } from "./ui/skeleton";

export const Camera = () => {
  const [images, setImages] = useState<TImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${BACKEND_URL}/ai/gen/image/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 50,
            offset: 0, // Start from the beginning
          },
        });
        setImages(response.data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [getToken]);

  return (
    <div className="grid grid-cols-2 p-2 md:grid-cols-4 w-full ">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-64 \w-full rounded-lg" />
        ))
      ) : images.length > 0 ? (
        images.map((image) => <ImageCard key={image.id} {...image} />)
      ) : (
        <p>No images</p>
      )}
    </div>
  );
};
