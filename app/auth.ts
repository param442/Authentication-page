import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "../lib/db";
import { getUserbyId } from "../data/user";
import { GetTwoFactorConformationByUserId } from "@/data/TwoFactorConformation";
import { userRole } from "@prisma/client";
import { GetAccountByUserID } from "@/data/account";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;
      const existingUser = await getUserbyId(user.id);
      if (!existingUser?.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const TwoFactor = await GetTwoFactorConformationByUserId(
          existingUser.id
        );
        if (!TwoFactor) {
          return false;
        }

        await db.twoFactorConformation.delete({
          where: { id: TwoFactor.id },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as userRole;
      }
      if (token.isTwoFactorAuthenticationEnabled && session.user) {
        session.user.isTwoFactorAuthenticationEnabled =
          token.isTwoFactorAuthenticationEnabled as boolean;
      }
      if (token.name && session.user) {
        session.user.name = token.name as string;
      }
      if (token.email && session.user) {
        session.user.email = token.email as string;
      }
      if (token.isOAuth && session.user) {
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserbyId(token.sub);
      if (!user) return token;
      const Account = await GetAccountByUserID(user.id);
      token.isOAuth = !!Account;
      token.role = user.role as userRole;
      token.email = user.email;
      token.name = user.name;
      token.isTwoFactorAuthenticationEnabled = user.isTwoFactorEnabled;

      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
