"use client";

import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUserContext } from "@/context/user";
import { CustomLink } from "./link";

export function UserDropdown() {
  const user = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none flex items-center gap-1">
          <Avatar>
            <AvatarImage src={`https://a.ppy.sh/${user.id}`} />
            <AvatarFallback>{user.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <CustomLink href="/dashboard">Dashboard</CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="!text-red-500" asChild>
          <CustomLink href="/logout">Logout</CustomLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
