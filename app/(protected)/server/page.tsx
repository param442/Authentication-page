import ServerUser from "@/lib/ServerUser";
import { UserInfo } from "@/components/User_info";
import React from "react";

const ServerPage = async () => {
  const user = await ServerUser();
  return (
    <div>
      <UserInfo user={user} label="💻 serverComponet" />
    </div>
  );
};

export default ServerPage;
