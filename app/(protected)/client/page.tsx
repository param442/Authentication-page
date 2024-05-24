import { UserInfo } from "@/components/User_info";
import React from "react";

import ServerRole from "@/lib/ServerRole";
import ServerUser from "@/lib/ServerUser";

const ClientPage = async () => {
  const user = await ServerUser();
  return (
    <div>
      {" "}
      <UserInfo user={user} label="📦Client Component" />{" "}
    </div>
  );
};

export default ClientPage;
