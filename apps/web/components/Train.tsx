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
import { TrainModel } from "@/types";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export const Train = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("Man");
  const [ethnicity, setEthnicity] = useState("White");
  const [eyeColor, setEyeColor] = useState("Gray");
  const [bald, setBald] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [zipUrl, setZipUrl] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const trainModel = async () => {
    const token = await getToken();
    console.log("token", token);
    const input = {
      zipUrl,
      type,
      age: Number(age),
      ethnicity,
      eyeColor,
      bald,
      name,
    };
    console.log(input);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/ai/train/training`,
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toast.success(
          "Model training started! This will take approximately 20 minutes."
        );
      }
    } catch (error) {
      toast.error("Failed to start model training");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Card className="w-[650px] shadow-2xl">
        <CardHeader>
          <CardTitle>Create Model</CardTitle>
          <CardDescription>Train Your Model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {/* Name Input */}
            <div className="flex justify-between gap-2">
              {" "}
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Age of the Model"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            {/* Type Select */}
            <div className="flex justify-between gap-2">
              {" "}
              <div className="flex flex-col space-y-1.5 flex-1">
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
              {/* Ethnicity Select */}
              <div className="flex flex-col space-y-1.5 flex-1">
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

            <div className="flex justify-between  gap-4">
              {/* Eye Color Select */}
              <div className="flex flex-col space-y-1.5 flex-1">
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
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label>Bald</Label>
                <Switch checked={bald} onCheckedChange={setBald} />
              </div>
            </div>

            <div>
              <Upload
                onUploadDone={(zipurl) => {
                  setZipUrl(zipurl);
                  console.log("in the page", zipurl);
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={trainModel}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
