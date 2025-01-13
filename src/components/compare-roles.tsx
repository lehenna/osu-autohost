"use client";

import { User } from "@prisma/client";
import { useUserContext } from "@/context/user";
import { UserRole, UserRoles } from "@/lib/user-roles";
import { useEffect, useState } from "react";

export function CompareRoles({
  userToEdit,
  children,
}: {
  userToEdit: User;
  children: React.ReactNode;
}) {
  const user = useUserContext();
  const [authorized, setAuthorized] = useState(
    UserRoles.compare(user.role, userToEdit.role as UserRole)
  );
  useEffect(() => {
    setAuthorized(UserRoles.compare(user.role, userToEdit.role as UserRole));
  }, [user, userToEdit]);
  if (authorized !== 1) return <></>;
  return <>{children}</>;
}
