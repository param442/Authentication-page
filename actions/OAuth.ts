"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

const OAuth = async (Provider: "google" | "github") => {
  try {
    const ans = await signIn(Provider, {
      redirectTo: "/setting",
    });
    return { success: "Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
};

export default OAuth;
