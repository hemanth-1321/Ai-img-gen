import React from "react";

export interface TPack {
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export const PackCard = (props: TPack) => {
  return (
    <div className="border rounded-2xl shadow-lg max-w-[350px]  overflow-hidden">
      {/* Image Section */}
      <div className="flex gap-2 p-2">
        <img
          src={props.imageUrl1}
          alt="img1"
          className="w-1/2 h-48 object-cover rounded-lg"
        />
        <img
          src={props.imageUrl2}
          alt="img2"
          className="w-1/2 h-48 object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold ">{props.name}</h3>
        <p className="text-sm  mt-1">{props.description}</p>
      </div>
    </div>
  );
};
