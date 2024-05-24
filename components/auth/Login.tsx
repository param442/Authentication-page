"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LginbuttonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  aschild?: boolean;
}

const Login = ({ children, mode = "redirect", aschild }: LginbuttonProps) => {
  const router = useRouter();
  const onclick = () => {
    router.push("/auth/login");
  };
  return (
    <span onClick={onclick} className="curson-pointer">
      {children}
    </span>
  );
};

export default Login;
