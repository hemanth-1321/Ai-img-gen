import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SelectModels } from "./SelectModels";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface TPack {
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
  id: string;
}

export const PackCard = (props: TPack) => {
  return (
    <Card className="max-w-60 rounded-2xl overflow-hidden shadow-lg bg-black text-white hover:shadow-primary/30 transition-all duration-300">
      <div className="relative w-full h-72">
        <Image
          src={props.imageUrl1}
          alt="image-pack"
          fill
          className="object-cover rounded-t-2xl"
        />
      </div>
      <CardContent className="p-2 space-y-3">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <p className="text-sm text-gray-400 line-clamp-2">
          {props.description}
        </p>
        <Dialog>
          <div className="flex justify-center items-center p-2">
            <DialogTrigger className="bg-white rounded text-black px-2 py-1 cursor-pointer">
              Generate
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogTitle className="text-lg font-semibold mb-2">
              Select Model
            </DialogTitle>
            <SelectModels packId={props.id} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
