import { db } from "@/lib/db";
import { z } from "zod";

export const getUserbyEmail = async (email: string) => {
  try {
    const ValidateEmail = z.string().email().safeParse(email);
    if (!ValidateEmail.success) {
      return null;
    }
    const user = await db.user.findFirst({
      where: { email: ValidateEmail.data },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserbyId = async (Id: string | number) => {
  try {
    const ValidateId = z.union([z.string(), z.number()]).safeParse(Id);
    if (!ValidateId.success) {
      return null;
    }
    const user = await db.user.findFirst({
      where: { id: ValidateId.data.toString() },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
