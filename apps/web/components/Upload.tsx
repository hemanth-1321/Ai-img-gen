"use client";
import React, { useEffect, useState } from "react";
import { CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import jszip, { file } from "jszip";
import { AWS_S3_URL, BACKEND_URL } from "@/lib/config";
import { CloudUpload } from "lucide-react";
import axios from "axios";

export const Upload = ({
  onUploadDone,
}: {
  onUploadDone: (zipurl: string) => void;
}) => {
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  useEffect(() => {
    console.log("Updated filePath:", filePath);
  }, [filePath]);

  const getPreSignedUrl = async (filename: string) => {
    console.log(filename);
    try {
      const response = await axios.post(`${BACKEND_URL}/ai/gen/presigned-url`, {
        fileName: filename,
        fileType: "application/zip",
      });
      setFilePath(response.data.filePath);
      return response.data.uploadURL;
    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
      return null;
    }
  };

  const uploadToPresignedUrl = async (presignedUrl: string, zipBlob: Blob) => {
    try {
      const response = await axios.put(presignedUrl, zipBlob, {
        headers: {
          "Content-Type": "application/zip",
        },
      });

      if (response.status === 200) {
        console.log("Upload successful!");

        if (!filePath) {
          console.error("File path is missing. Retrying...");
          return;
        }

        const finalPath = `${AWS_S3_URL}/${filePath}`;
        console.log("Final S3 URL:", finalPath);

        onUploadDone(finalPath); // Call onUploadDone only when filePath is set
      } else {
        console.error("Upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading ZIP file:", error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      console.log(filesArray);

      const zip = new jszip();
      filesArray.forEach((file) => {
        zip.file(file.name, file);
      });
      try {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setZipBlob(zipBlob);
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!zipBlob) {
      console.error("No ZIP file to upload!");
      return;
    }
    console.log(zipBlob);
    const zipFilename = `files_${Date.now()}.zip`;
    const presignedUrl = await getPreSignedUrl(zipFilename);

    if (presignedUrl) {
      await uploadToPresignedUrl(presignedUrl, zipBlob);
    }
  };
  return (
    <div>
      {/* Image Upload Section */}
      <CardFooter className="flex flex-col space-y-2">
        <CloudUpload />
        <Label className="text-lg font-semibold">Upload Images</Label>

        {/* File Input */}
        <Input
          type="file"
          multiple
          className="w-full py-2 border border-gray-300 rounded-lg"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <Button onClick={handleUpload} className="w-full mt-4">
          Upload
        </Button>
      </CardFooter>
    </div>
  );
};
