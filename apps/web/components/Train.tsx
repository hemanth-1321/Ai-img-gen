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
import { Upload } from "@/components/Upload";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export const Train = () => {
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("Man");
  const [ethnicity, setEthnicity] = useState("White");
  const [eyeColor, setEyeColor] = useState("Gray");
  const [bald, setBald] = useState(false);
  const [zipUrl, setZipUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const trainModel = async () => {
    const token = await getToken();
    const input = {
      zipUrl,
      type,
      age: Number(age),
      ethnicity,
      eyeColor,
      bald,
      name,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/ai/train/training`,
        input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success(
          "Model training started! This will take approximately 20 minutes."
        );
      }
    } catch (error) {
      toast.error("Failed to start model training");
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 px-4 md:px-0">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Create Model</CardTitle>
          <CardDescription>Train Your Model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Model Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Man">Men</SelectItem>
                    <SelectItem value="Woman">Women</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="AsianAmerican">
                      Asian American
                    </SelectItem>
                    <SelectItem value="EastAsian">East Asian</SelectItem>
                    <SelectItem value="SouthEastAsian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="SouthAsian">South Asian</SelectItem>
                    <SelectItem value="MiddleEastern">
                      Middle Eastern
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
              <div className="flex justify-start gap-4 md:mt-8">
                <Label>Bald</Label>
                <Switch checked={bald} onCheckedChange={setBald} />
              </div>
            </div>

            {/* Upload Component */}
            <Upload
              onUploadStart={() => {
                setIsUploading(true);
                toast.warning("Wait, your images are uploading...");
              }}
              onUploadDone={(zipurl) => {
                setZipUrl(zipurl);
                setIsUploading(false);
                toast.success("Upload complete! You can now submit.");
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={trainModel}
            className="w-full md:w-auto"
            disabled={isUploading || !zipUrl} // Disable if uploading or zipUrl is missing
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
