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
import { BACKEND_URL } from "@/lib/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload } from "@/components/Upload";
const Page = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [zipurl, setZipUrl] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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

              <div>
                <Upload
                  onUploadDone={(zipurl) => {
                    setZipUrl(zipurl);
                    console.log("inthe page", zipurl);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
