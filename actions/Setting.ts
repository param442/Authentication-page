"use server";

import { getUserbyEmail, getUserbyId } from "@/data/user";
import ServerUser from "@/lib/ServerUser";
import { db } from "@/lib/db";
import { SendVerificationEmail } from "@/lib/mail";
import { GenrateVerificationToken } from "@/lib/token";
import { SettingSchema } from "@/schemas";
import bcyrpt from "bcryptjs";
import { z } from "zod";

export const Settings = async (values: z.infer<typeof SettingSchema>) => {
  try {
    const user = await ServerUser();
    if (
      values.password !== undefined &&
      values.newpassword != undefined &&
      values.password === values.newpassword
    ) {
      return { error: "Password can not match" };
    }
    if (!user) {
      console.error("Settings Update Error: Unauthorized access attempt.");
      return { error: "Unauthorized: User session not found." };
    }

    const DbUser = await getUserbyId(user.id);
    if (!DbUser) {
      return { error: "Unauthorized: User not found in the database." };
    }

    if (user.isOAuth) {
      values.email = undefined;
      values.password = undefined;
      values.newpassword = undefined;
      values.isTwoFactorEnabled = undefined;
    }
    if (values.email && values.email != user.email) {
      if (!user.email) {
        return { error: "user Email Does not exist" };
      }

      if (!DbUser.email) return { error: "something went wrong" };

      const exitingUser = await getUserbyEmail(values.email);

      if (exitingUser) return { error: "User alredy taken" };

      const Token = await GenrateVerificationToken(values.email);

      await SendVerificationEmail(Token.email, Token.token, DbUser.email);

      return { success: "Verification Email has been sent" };
    }
    if (values.password && values.newpassword && DbUser.password) {
      const ISPasswordCorrect = await bcyrpt.compare(
        values.password,
        DbUser.password
      );

      if (!ISPasswordCorrect) return { error: "Enter valid Password" };

      const HashPassword = await bcyrpt.hash(values.newpassword, 10);

      values.password = HashPassword;

      values.newpassword = undefined;
    }
    await db.user.update({
      where: { id: DbUser.id },
      data: {
        ...values,
      },
    });

    return { success: " User details updated successfully." };
  } catch (error) {
    return { error: "Internal Server Error: Please try again later." };
  }
};
