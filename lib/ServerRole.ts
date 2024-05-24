import { auth } from "@/app/auth";

const ServerRole = async () => {
  const session = await auth();
  return session?.user.role;
};

export default ServerRole;
