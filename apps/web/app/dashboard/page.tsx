import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateImage } from "@/components/GenerateImage";
import { Packs } from "@/components/Packs";
import { Train } from "@/components/Train";
import { Camera } from "@/components/Camera";

const page = () => {
  return (
    <div className="flex justify-center mt-24">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center w-full">
          <Tabs defaultValue="account" className="w-full">
            <div className="flex justify-center">
              <TabsList className="gap-4">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="generate">Generate Image</TabsTrigger>
                <TabsTrigger value="train">Train a model</TabsTrigger>
                {/* <TabsTrigger value="packs">Packs</TabsTrigger> */}
              </TabsList>
            </div>
            <TabsContent value="generate" className="w-full">
              <GenerateImage />
            </TabsContent>
            <TabsContent value="train" className="w-full">
              <Train />
            </TabsContent>
            {/* <TabsContent value="packs" className="w-full">
              <Packs />
            </TabsContent>{" "} */}
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
