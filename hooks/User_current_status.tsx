import { useSession } from "next-auth/react";

export const User_current_status = () => {
  const session = useSession();
  return session.data?.user;
};
