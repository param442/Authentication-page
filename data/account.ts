import { db } from "@/lib/db";

export const GetAccountByUserID = async (userId: string) => {
  try {
    const Account = await db.account.findFirst({
      where: { userId: userId },
    });
    return Account;
  } catch (error) {
    return null;
  }
};
