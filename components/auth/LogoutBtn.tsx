"use client";

import { signOut } from "next-auth/react";
import React from "react";

interface LogoutBtnprops {
  children?: React.ReactNode;
}
const LogoutBtn = ({ children }: LogoutBtnprops) => {
  const onClick = () => {
    signOut();
  };
  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutBtn;
