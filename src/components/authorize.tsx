"use client";

import { useUserContext } from "@/context/user";
import { UserPermission, UserRoles } from "@/lib/user-roles";
import { useEffect, useState } from "react";

export function Authorize({
  permission,
  children,
}: {
  permission: UserPermission | string;
  children: React.ReactNode;
}) {
  const user = useUserContext();
  const [authorized, setAuthorized] = useState(
    UserRoles.can(user.role, permission as UserPermission)
  );
  useEffect(() => {
    setAuthorized(UserRoles.can(user.role, permission as UserPermission));
  }, [user, permission]);
  if (!authorized) return <></>;
  return <>{children}</>;
}
