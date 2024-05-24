"use server";

import { signIn } from "@/app/auth";
import { defaultLoggedPrefix } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { GenerateTwoFactorToken, GenrateVerificationToken } from "@/lib/token";
import { getUserbyEmail } from "@/data/user";
import { SendVerificationEmail, SendTwoFactorEmail } from "@/lib/mail";
import { GetTwoFactorTokenByEmail } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { GetTwoFactorConformationByUserId } from "@/data/TwoFactorConformation";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validateSchema = LoginSchema.safeParse(values);
  if (!validateSchema.success) {
    return { error: " credential are not in right format" };
  }
  const { email, password, code } = validateSchema.data;
  const existingUser = await getUserbyEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email Does not exist" };
  }
  if (existingUser && !existingUser.emailVerified) {
    const verificationToken = await GenrateVerificationToken(email);

    await SendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { error: "Please verify your email. We have re-sent the link." };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const TwoFactorToken = await GetTwoFactorTokenByEmail(existingUser.email);
      if (!TwoFactorToken) return { error: " Invalid Code!" };
      if (TwoFactorToken.token !== code) return { error: " Invalid Code!" };

      const hasExpired = new Date(TwoFactorToken.expire) < new Date();
      if (hasExpired) return { error: "Token has expired" };

      await db.twoFactorToken.delete({
        where: { id: TwoFactorToken.id },
      });

      const TwoFactorConformation = await GetTwoFactorConformationByUserId(
        existingUser.id
      );
      if (TwoFactorConformation) {
        await db.twoFactorConformation.delete({
          where: { id: TwoFactorConformation.id },
        });
      }

      await db.twoFactorConformation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const GenerateTwoFactorTokens = await GenerateTwoFactorToken(
        existingUser.email
      );
      await SendTwoFactorEmail(
        existingUser.email,
        GenerateTwoFactorTokens.token
      );
      return { TwoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoggedPrefix,
    });

    return { success: "You are logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
