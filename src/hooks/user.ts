import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { UserRole } from "@/lib/user-roles";

export type UserData = User & { role: UserRole };

export function useUser(userData: UserData) {
  const [user, setUser] = useState<UserData>(userData);
  useEffect(() => {
    (async () => {
      socket.on("userUpdated", (raw) => {
        const updatedUser = JSON.parse(raw) as User & { role: UserRole };
        if (userData.id !== updatedUser.id) return;
        setUser(updatedUser);
      });
    })();
  }, [userData]);
  return user;
}
