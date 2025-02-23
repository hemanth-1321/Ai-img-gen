"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="mt-20 max-w-6xl">
        <h1 className="text-4xl md:text-8xl pb-6 text-center">
          Transform Your Photos with AI Magic
        </h1>
        <div>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/4">
                <Image
                  src={
                    "https://r2-us-west.photoai.com/1726227016-0fa4e13fa2b89f39874eb0a166d2f784-2.png"
                  }
                  alt="demoimg"
                  width={400}
                  height={400}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex justify-center mt-6">
          <SignedOut>
            <Button variant={"ghost"}>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="px-4 py-4 m-6 cursor-pointer"
            >
              DashBoard
            </Button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
