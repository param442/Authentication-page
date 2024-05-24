import { userRole } from "@prisma/client";
import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"), // Custom error message
  code: z.string().optional(),
});
export const ResetSchema = z.object({
  email: z.string().email(),
});
export const PasswordSchema = z.object({
  OldPassword: z.string().min(1),
  NewPassword: z.string().min(1),
});

export const SignupSchema = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(1, "Password cannot be empty"), // Custom error message
});

// types.ts
export type UserRole = "ADMIN" | "User";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
}
export const SettingSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([userRole.ADMIN, userRole.USER]).optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 digits" })
      .optional(),
    newpassword: z
      .string()
      .min(6, { message: "Password must have at least 6 digits" })
      .optional(),
  })
  .refine(
    (data) => {
      if (
        (data.password && !data.newpassword) ||
        (!data.password && data.newpassword)
      ) {
        return false;
      }
      return true;
    },
    {
      message: " Password Required",
      path: ["new password"],
    }
  );
