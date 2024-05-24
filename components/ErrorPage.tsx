"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  children: React.ReactNode;
  ErrorCode?: string | number;
  description?: string;
  ClassName?: string;
  href: string;
  Page: string;
}

const ErrorPage = ({
  children,
  ErrorCode,
  description,
  ClassName,
  href,
  Page,
}: ErrorPageProps) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "h-screen w-full text-5xl text-slate-100 bg-slate-900 flex flex-col gap-6 items-center justify-center ",
        ClassName
      )}>
      {ErrorCode && <h1 className="text-[8vmax]"> {ErrorCode}</h1>}
      {children}
      {description && (
        <h1 className="text-[1.5vmax] mt-5 text-center"> {description}</h1>
      )}
      <Button
        onClick={() => {
          router.push(href);
        }}
        className="font-normal  ">
        <span className="text-white underline-offset-4 hover:underline">
          {Page}
        </span>
      </Button>
    </div>
  );
};

export default ErrorPage;
