"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./Header";
import Social from "./Social";
import BackButton from "./BackButton";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLable: string;
  backbuttonLabel: string;
  backbuttonHref: string;
  showsocial?: boolean;
  className?: string;
}
const CardWrapper = ({
  children,
  headerLable,
  backbuttonHref,
  backbuttonLabel,
  showsocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        " w-[350px] tablet:w-[400px] shadow-md overflow-hidden",
        className
      )}>
      <CardHeader>
        <Header label={headerLable} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showsocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backbuttonLabel} href={backbuttonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
