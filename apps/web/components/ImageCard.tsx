import React from "react";
import { Skeleton } from "./ui/skeleton";

export interface TImage {
  id: string;
  imageUrl: string;
  status: string;
}

export const ImageCard = (props: TImage) => {
  return (
    <div className="border rounded-2xl shadow-xl max-w-[200px] mt-6 overflow-hidden  transition-transform hover:scale-105 duration-200">
      <div className="relative ">
        {props.status === "Generated" ? (
          <img
            src={props.imageUrl}
            alt="Generated Image"
            className="w-full h-[300px] object-cover rounded-t-2xl "
          />
        ) : (
          <Skeleton className="rounded w-full h-40  " />
        )}
      </div>
    </div>
  );
};
