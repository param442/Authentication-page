import { db } from "@/lib/db";
import { validate } from "uuid";
import { z } from "zod";

export const GetTwoFactorConformationByUserId = async (Id: string | number) => {
  const ValidateId = z.union([z.string(), z.number()]).safeParse(Id);

  try {
    const data = ValidateId.data;
    const TwoFactorConformation = db.twoFactorConformation.findUnique({
      where: { userId: Id.toString() },
    });
    return TwoFactorConformation;
  } catch (error) {
    return null;
  }
};
