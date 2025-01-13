"use client";

import { Authorize } from "@/components/authorize";
import { CompareRoles } from "@/components/compare-roles";
import { EditUserBan } from "@/components/edit-user-ban";
import { EditUserRole } from "@/components/edit-user-role";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    cell({ cell }) {
      return (
        <Avatar>
          <AvatarImage src={`https://a.ppy.sh/${cell.row.original.id}`} />
          <AvatarFallback>
            {cell.row.original.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      );
    },
    header: "Avatar",
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    cell({ row }) {
      const user = row.original;
      return (
        <span className="flex items-center gap-1.5">
          {user.role}
          <CompareRoles userToEdit={user}>
            <Authorize permission="users.update">
              <EditUserRole user={user} />
            </Authorize>
          </CompareRoles>
        </span>
      );
    },
    header: "Role",
  },
  {
    accessorKey: "banned",
    cell({ row }) {
      const user = row.original;
      return (
        <span className="flex items-center gap-1.5">
          {user.banned ? "Yes" : "No"}
          <CompareRoles userToEdit={user}>
            <Authorize permission="users.ban">
              <EditUserBan user={user} />
            </Authorize>
          </CompareRoles>
        </span>
      );
    },
    header: "Banned",
  },
];
