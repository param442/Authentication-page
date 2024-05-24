"use client";
import { useSession } from "next-auth/react";

export const UserRole_current = () => {
  const session = useSession();

  return session.data?.user.role; // Return only the role string or undefined
};
