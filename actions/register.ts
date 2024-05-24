"use server";
import bcrypt from "bcryptjs";
import { SignupSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { GenrateVerificationToken } from "@/lib/token";
import { SendVerificationEmail } from "@/lib/mail";
export const register = async (values: z.infer<typeof SignupSchema>) => {
  const validationFields = SignupSchema.safeParse(values);
  if (!validationFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, name } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserbyEmail(email);
  if (existingUser) return { error: "email already in use" };
  const user = await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  const verificationToken = await GenrateVerificationToken(email);
  await SendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Email sent please verify it" };
};
