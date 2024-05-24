import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserbyEmail } from "../data/user";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
// Define the type of the credential parameter explicitly
const data = Credentials({
  credentials: {
    username: { label: "Username" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credential) {
    const validateFields = LoginSchema.safeParse(credential);
    if (validateFields.success) {
      const { email, password } = validateFields.data;
      const user = await getUserbyEmail(email);
      if (!user || !user.password) {
        return null;
      }
      const PasswordMatch = await bcrypt.compare(password, user.password);
      if (PasswordMatch)
        return {
          ...user,
        };
    }
    return null;
  },
});
const nextAuthConfig: NextAuthConfig = {
  providers: [
    data,
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          respose_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          respose_type: "code",
        },
      },
    }),
  ],
};

export default nextAuthConfig;
