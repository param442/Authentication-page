import { ExtentedUser } from "@/next_auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProp {
  user?: ExtentedUser;
  label: string;
}
export const UserInfo = ({ user, label }: UserInfoProp) => {
  return (
    <Card className="mt-5 w-[600px] shadow-md">
      <CardHeader>
        <p className="text-lg font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-muted-foreground">
          <p className="text-sm font-medium">Id</p>
          <p className="text-sm font-meditm"> {user?.id}</p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-muted-foreground">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm font-meditm"> {user?.email}</p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-muted-foreground">
          <p className="text-sm font-medium">Role</p>
          <p className="text-sm font-meditm"> {user?.role}</p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-muted-foreground">
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm font-meditm"> {user?.name}</p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-muted-foreground">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <p className="text-sm font-meditm">
            {" "}
            {user?.isTwoFactorAuthenticationEnabled ? "ON" : "OFF"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
