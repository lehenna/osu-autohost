"use client";

import { User } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PenIcon } from "lucide-react";
import { useCallback } from "react";
import { banOrUnban } from "@/actions/users";

export function EditUserBan({ user }: { user: User }) {
  const handleClick = useCallback(async () => {
    await banOrUnban(user.id);
  }, [user]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <PenIcon className="w-[.85rem] h-[.85rem] text-blue-500 transition-[color] text-blue-500/80" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{user.banned ? "Unban" : "Ban"}</AlertDialogTitle>
          <AlertDialogDescription>
            To continue, you need to confirm that you are sure you are doing
            what you are doing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>
            {user.banned ? "Unban" : "Ban"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
