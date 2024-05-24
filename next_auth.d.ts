// next-auth.d.ts
import { userRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: userRole;
      id: string;
      isTwoFactorAuthenticationEnabled: boolean;
      isOAuth: boolean;
      provider: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: userRole;
    sub: string;
    isTwoFactorAuthenticationEnabled: boolean;
    isOAuth: boolean;
  }
}
export type ExtentedUser = DefaultSession["user"] & {
  role: userRole;
  isTwoFactorAuthenticationEnabled: boolean;
  isOAuth: boolean;
};
