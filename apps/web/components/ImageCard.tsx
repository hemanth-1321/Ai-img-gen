import React from "react";

export interface TImage {
  id: string;
  imageUrl: string;
}

export const ImageCard = ({ id, imageUrl }: TImage) => {
  return (
    <div className="border rounded-2xl shadow-xl max-w-[200px] overflow-hidden  transition-transform hover:scale-105 duration-200">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Generated Image"
          className="w-full h-[300px] object-cover rounded-t-2xl"
        />
      </div>
    </div>
  );
};
