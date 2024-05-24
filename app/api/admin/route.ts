"use server";
import ServerRole from "@/lib/ServerRole";
import { userRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await ServerRole();
  if (!user) return new NextResponse(null, { status: 403 });
  if (user !== userRole.ADMIN) return new NextResponse(null, { status: 403 });
  return new NextResponse(null, { status: 200 });
}
