"use client";

import { User } from "@prisma/client";
import { UserContext } from "../context/user";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { UserRole } from "@/lib/user-roles";

export function UserProvider({
  children,
  user: defaultUser,
}: {
  children: React.ReactNode;
  user: User & { role: UserRole };
}) {
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    socket.on("userUpdated", (raw) => {
      const updatedUser = JSON.parse(raw) as User & { role: UserRole };
      if (user.id !== updatedUser.id) return;
      setUser(updatedUser);
    });
  }, [user]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
