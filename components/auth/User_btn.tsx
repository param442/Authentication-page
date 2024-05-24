"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { User_current_status } from "@/hooks/User_current_status";
import LogoutBtn from "./LogoutBtn";
import { ExitIcon } from "@radix-ui/react-icons";

const User_btn = () => {
  const user = User_current_status();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            className=" h-10 w-10 rounded-full "
            src={user?.image || ""}
          />
          <AvatarFallback>
            <div className="bg-sky-500 px-[10px] py-[10px] rounded-full">
              <FaUser className=" text-white h-5 w-5" />
            </div>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutBtn>
          <DropdownMenuItem>
            <div className="bg-white text-black flex items-center justify-center gap-3 px-2 rounded-md mt-2">
              <ExitIcon />
              Logout
            </div>
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User_btn;
