"use client";
import { admin } from "@/actions/admin";
import Form_success from "@/components/Form_success";
import { RoleGate } from "@/components/auth/Role_base";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole_current } from "@/hooks/User_current_role";
import { userRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const Admin = () => {
  const onServerAdminClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.sucess) {
        toast.success(data.sucess);
      }
    });
  };
  const Role = UserRole_current();
  const onClickApi = async () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("succesfull");
      } else {
        toast.error("unsuccessfull");
      }
    });
  };
  return (
    <div>
      <Card className="w-[600px] mt-5">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">🔑 Admin</p>
          <CardContent className="space-y-4"></CardContent>
        </CardHeader>
        <CardContent>
          <RoleGate allowedRole={userRole.ADMIN}>
            <Form_success message="You are alowed to see this content" />
          </RoleGate>
          <div className=" flex flex-row items-center justify-between rounde-lg p-3 shadow-md">
            <p className="text-sm font-medium"> Admin Api Rotes only</p>
            <div>
              <Button asChild onClick={onClickApi} Hover={false}>
                Click to Text
              </Button>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-between rounde-lg p-3 shadow-md">
            <p className="text-sm font-medium"> Admin-server Test</p>
            <div>
              <Button asChild onClick={onServerAdminClick} Hover={false}>
                Click to Text
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
