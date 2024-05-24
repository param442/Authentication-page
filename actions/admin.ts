"use server";

import ServerRole from "@/lib/ServerRole";
import { userRole } from "@prisma/client";

export const admin = async () => {
  const role = await ServerRole();
  if (role !== userRole.ADMIN) {
    return { error: "Forbidden" };
  }
  return { sucess: "Allowed" };
};
