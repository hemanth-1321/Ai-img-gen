import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const ImgCarousel = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4">
            <Image
              src={
                "https://v3.fal.media/files/penguin/VaCDAFiorU-4Uxug3Vhn1_6e39e61cf9b542f1b7493cbc4822cf3d.jpg"
              }
              width={"40"}
              height={"40"}
              alt="img"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">
            <Image
              src={
                "https://v3.fal.media/files/penguin/VaCDAFiorU-4Uxug3Vhn1_6e39e61cf9b542f1b7493cbc4822cf3d.jpg"
              }
              width={"40"}
              height={"40"}
              alt="img"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4">
            <Image
              src={
                "https://v3.fal.media/files/penguin/VaCDAFiorU-4Uxug3Vhn1_6e39e61cf9b542f1b7493cbc4822cf3d.jpg"
              }
              width={"40"}
              height={"40"}
              alt="img"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
