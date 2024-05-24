import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { db } from "./db";
import {
  GetPasswordTokenByEmail,
  GetTwoFactorTokenByEmail,
  verificationTokenByEmail,
} from "@/data/verificationToken";

export const GenrateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingToken = await verificationTokenByEmail(email);
  if (exisitingToken && exisitingToken.token) {
    await db.verficationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }
  const verificationToken = await db.verficationToken.create({
    data: {
      email: email,
      token: token,
      expire: expire,
    },
  });
  return verificationToken;
};

export const GenrateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingToken = await GetPasswordTokenByEmail(email);
  if (exisitingToken && exisitingToken.token) {
    await db.resetPasswordToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }
  const verificationToken = await db.resetPasswordToken.create({
    data: {
      email: email,
      token: token,
      expire: expire,
    },
  });
  return verificationToken;
};

export const GenerateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expire = new Date(new Date().getTime() + 3600 * 1000);
  const TokenExist = await GetTwoFactorTokenByEmail(email);
  if (TokenExist && TokenExist.token) {
    await db.twoFactorToken.delete({ where: { id: TokenExist.id } });
  }
  const Created_2_Factor_Token = await db.twoFactorToken.create({
    data: {
      token: token,
      email: email,
      expire: expire,
    },
  });
  return Created_2_Factor_Token;
};
