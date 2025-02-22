"use client";
import React, { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export const AppBar = () => {
  const { user } = useUser();

  useEffect(() => {
    const handleSignIn = async () => {
      if (!user) return;
      const email = user.primaryEmailAddress?.emailAddress;
      if (email) {
        console.log("User signed in with email:", email);
        try {
          await axios.post(`${BACKEND_URL}/auth/user`, { email });
        } catch (error) {
          console.error("Error sending user data:", error);
        }
      }
    };

    handleSignIn();
  }, [user]);

  return (
    <div className="flex justify-between p-4 border-b shadow-xl">
      <Link href={"/"}>
        <div className="text-xl font-bold">PhotoGen-AI</div>
      </Link>

      <div>
        <SignedOut>
          <Button asChild className="cursor-pointer bg-slate-700">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
