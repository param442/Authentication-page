"use server";

import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import { verificationTokenByToken } from "@/data/verificationToken";

const newVerification = async (token: string, OldEmail?: string) => {
  const existingToken = await verificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token do not exist" };
  }
  const hasExpired = new Date(existingToken.expire) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = OldEmail
    ? await getUserbyEmail(OldEmail)
    : await getUserbyEmail(existingToken.email);
  if (!existingUser) {
    return { error: "user does not exist" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await db.verficationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "email verified" };
};
export default newVerification;
