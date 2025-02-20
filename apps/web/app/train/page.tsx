"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Page = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isClient, setIsClient] = useState(false); // Fix hydration issue

  useEffect(() => {
    setIsClient(true); // Ensure component is mounted before rendering
  }, []);

  if (!isClient) return null; // Prevent SSR mismatches

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      console.log(filesArray);
      setSelectedFiles(filesArray);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* Name Input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Type Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Age of the Model"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Ethnicity Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian American">
                      Asian American
                    </SelectItem>
                    <SelectItem value="East Asian">East Asian</SelectItem>
                    <SelectItem value="South East Asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="South Asian">South Asian</SelectItem>
                    <SelectItem value="Middle Eastern">
                      Middle Eastern
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Eye Color Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="eyeColor">Eye Color</Label>
                <Select value={eyeColor} onValueChange={setEyeColor}>
                  <SelectTrigger id="eyeColor">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bald Switch */}
              <div className="flex flex-col space-y-1.5">
                <Label>Bald</Label>
                <Switch />
              </div>
            </div>
          </form>
        </CardContent>

        {/* Image Upload Section */}
        <CardFooter className="flex flex-col space-y-2">
          <Label className="text-lg font-semibold">Upload Images</Label>

          {/* File Input */}
          <Input
            type="file"
            multiple
            className="w-full py-2 border border-gray-300 rounded-lg"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Preview Selected Images */}
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative w-24 h-24 border p-1">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <Button className="w-full mt-4">Upload</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
