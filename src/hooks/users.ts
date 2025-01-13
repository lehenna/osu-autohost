import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { socket } from "../lib/socket";
import { getUsers } from "@/actions/users";

export function useUsers() {
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
      setPending(false);
      socket.on("userUpdated", (raw) => {
        const user = JSON.parse(raw) as User;
        setUsers((users) => {
          const newUsers = [...users];
          const userIndex = newUsers.findIndex((r) => r.id === user.id);
          if (userIndex !== -1) {
            newUsers[userIndex] = user;
          }
          return newUsers;
        });
      });
    })();
  }, []);
  return { users, pending };
}
