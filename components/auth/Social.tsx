"use client";
import React, { startTransition } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import OAuth from "@/actions/OAuth";

const Social = () => {
  return (
    <div className="flex items-center gap-x-2 w-full ">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        color="bg-black"
        onClick={() => OAuth("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        color="bg-pearl"
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => OAuth("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
