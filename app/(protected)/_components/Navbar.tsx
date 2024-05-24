"use client";
import User_btn from "@/components/auth/User_btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className=" bg-secondary flex justify-between  items-center p-4 rounded-xl w-[600px] shadow-sm text-slate-900 ">
      <div className="flex gap-2">
        <Button
          asChild
          Hover={false}
          variant={pathname === "/server" ? "default" : "outline"}
          className="w-[10%]">
          <Link href={"/server"}>server</Link>
        </Button>
        <Button
          asChild
          Hover={false}
          variant={pathname === "/client" ? "default" : "outline"}
          className="w-[10%]">
          <Link href={"/client"}>client</Link>
        </Button>
        <Button
          asChild
          Hover={false}
          variant={pathname === "/admin" ? "default" : "outline"}
          className="w-[10%]">
          <Link href={"/admin"}> Admin</Link>
        </Button>
        <Button
          asChild
          Hover={false}
          variant={pathname === "/setting" ? "default" : "outline"}
          className="w-[10%]">
          <Link href={"/setting"}>Settings</Link>
        </Button>
      </div>
      <User_btn />
    </div>
  );
};

export default Navbar;
