"use client";

import { FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useLogout from "../Auth/hooks/useLogout";

interface Props {
  user?: any;
}

export default function UserAvatar({ user }: Props) {
  const { handleLogout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image as string}
              alt={user?.first_name as string}
            />
            <AvatarFallback>{user?.first_name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard`}>
            <FiUser className="mr-2 h-4 w-4" />
            <span>Dashborad</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/dashboard/setting`} className="flex">
            <FiUser className="mr-2 h-4 w-4" />
            <span>Setting</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <FiLogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
