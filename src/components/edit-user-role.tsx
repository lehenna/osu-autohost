"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoleForm } from "./forms/user-role-form";
import { User } from "@prisma/client";
import { PenIcon } from "lucide-react";

export function EditUserRole({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger>
        <PenIcon className="w-[.85rem] h-[.85rem] text-blue-500 transition-[color] hover:text-blue-500/80" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        <UserRoleForm userId={user.id} role={user.role} />
      </DialogContent>
    </Dialog>
  );
}
