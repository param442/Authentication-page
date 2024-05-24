"use client";
import { UserRole_current } from "@/hooks/User_current_role";
import { userRole } from "@prisma/client";
import Form_error from "../Form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: userRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = UserRole_current();

  if (!role) {
    return (
      <Form_error message="Your role is not defined. Please log in again." />
    );
  }

  if (role !== allowedRole) {
    return <Form_error message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
