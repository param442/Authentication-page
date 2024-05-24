"use server";

import { getUserbyEmail } from "@/data/user";
import { GetPasswordTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { PasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const PasswordVerification = async (
  data: z.infer<typeof PasswordSchema>,
  token: string
) => {
  const { OldPassword, NewPassword } = data;

  if (OldPassword === NewPassword) {
    return { error: "New password should not match the old password" };
  }

  const Token = await GetPasswordTokenByToken(token);

  if (!Token) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(Token.expire) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const user = await getUserbyEmail(Token.email);

  if (!user || user.email == null || user.password == null) {
    return { error: "Invalid Token" };
  }

  try {
    const passwordMatch = await bcrypt.compare(OldPassword, user.password);
    if (!passwordMatch) {
      return { error: "Your old password is incorrect" };
    }

    const hashedPassword = await bcrypt.hash(NewPassword, 10);
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    await db.resetPasswordToken.delete({ where: { id: Token.id } });
    return { success: "Password has been changed" };
  } catch (error) {
    console.error("Error while changing password:", error);
    return { error: "An error occurred while changing password" };
    throw error;
  }
};
