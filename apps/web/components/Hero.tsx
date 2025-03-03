import React from "react";
import { Vortex } from "./ui/vortex";
import { ImgCarousel } from "./Carousel";

export function Hero() {
  return (
    <div className=" mx-auto rounded-md  h-screen w-full overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          AI Magic for Stunning Photos
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Generate stunning photos with AI.
        </p>
      </Vortex>
    </div>
  );
}
