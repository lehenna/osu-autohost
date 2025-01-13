"use client";

import { UserData, useUser } from "@/hooks/user";
import { UserContext } from "../context/user";

export function UserProvider({
  children,
  user: userData,
}: {
  children: React.ReactNode;
  user: UserData;
}) {
  const user = useUser(userData);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
