import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/GenerateImage";
import { Packs } from "@/components/Packs";
import { Train } from "@/components/Train";
import { Camera } from "@/components/Camera";

const page = () => {
  return (
    <div className="flex justify-center mt-24">
      <div className="container mx-auto px-4 py-2 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          <Tabs defaultValue="camera" className="w-full">
            <div className="flex justify-center">
              <TabsList className="gap-4 grid grid-cols-2 md:grid-cols-4 m-4 min-w-0">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="generate">Generate Image</TabsTrigger>
                <TabsTrigger value="train">Train a model</TabsTrigger>
                <TabsTrigger value="packs">Packs</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="generate" className="w-full">
              <GenerateImage />
            </TabsContent>
            <TabsContent value="train" className="w-full">
              <Train />
            </TabsContent>
            <TabsContent value="packs" className="w-full">
              <Packs />
            </TabsContent>
            <TabsContent value="camera" className="w-full">
              <Camera />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
