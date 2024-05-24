"use server";

import { getUserbyEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { GenrateResetPasswordToken } from "@/lib/token";
import { SendRestPasswordToken } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid email" };
  const { email } = validateFields.data;
  const existingUser = await getUserbyEmail(email);
  if (!existingUser) return { error: "user does not exist" };
  if (!existingUser.email) return { error: "some error accured" };

  const token = await GenrateResetPasswordToken(existingUser.email);
  await SendRestPasswordToken(token.email, token.token);
  return { success: "Email sent" };
};
