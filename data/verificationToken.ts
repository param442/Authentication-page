import { db } from "@/lib/db";

export const verificationTokenByEmail = async (email: string) => {
  try {
    const Token = await db.verficationToken.findFirst({
      where: { email },
    });
    return Token;
  } catch (error) {
    return null;
  }
};

export const verificationTokenByToken = async (token: string) => {
  try {
    const Token = await db.verficationToken.findUnique({
      where: { token },
    });
    return Token;
  } catch (error) {
    return null;
  }
};

export const GetPasswordTokenByToken = async (token: string) => {
  try {
    const Token = await db.resetPasswordToken.findUnique({
      where: { token },
    });
    return Token;
  } catch (error) {
    return null;
  }
};

export const GetPasswordTokenByEmail = async (email: string) => {
  try {
    const Token = await db.resetPasswordToken.findFirst({
      where: { email },
    });
    return Token;
  } catch (error) {
    return null;
  }
};

export const GetTwoFactorTokenByToken = async (token: string) => {
  try {
    const Token = db.twoFactorToken.findUnique({ where: { token } });
    return Token;
  } catch (error) {
    return null;
  }
};
export const GetTwoFactorTokenByEmail = async (email: string) => {
  try {
    const Token = db.twoFactorToken.findFirst({ where: { email } });
    return Token;
  } catch (error) {
    return null;
  }
};
