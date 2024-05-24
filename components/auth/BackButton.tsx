"use clinet";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}
const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="w-full flex items-center justify-center ">
      <Button
        variant="link"
        Hover={false}
        className="font-normal w-full flex items-center justify-center">
        {" "}
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href={href}>
          {" "}
          {label}{" "}
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
