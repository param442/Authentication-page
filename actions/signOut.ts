"use server";

import { signOut } from "@/app/auth";
import { useRouter } from "next/navigation"; // Import useNavigation instead of useRouter

export const Signout = async () => {
  const navigation = useRouter(); // Use useNavigation hook

  await signOut({ redirectTo: "/auth/login" });
  // Use navigation.navigate to redirect
};
