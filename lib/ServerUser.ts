import { auth } from "@/app/auth";

const ServerUser = async () => {
  const session = await auth();
  return session?.user;
};

export default ServerUser;
