import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "./ui/button";

export const GenerateImage = () => {
  const [models, setModels] = useState();
  return (
    <div className="h-[60vh] items-center justify-center flex flex-col">
      <Textarea className="py-8 px-4 w-2xl" />

      <Button className="m-4 cursor-pointer">Create Image</Button>
    </div>
  );
};
