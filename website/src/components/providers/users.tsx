import { UsersContext } from "@/context/users";
import { useUsers } from "@/hooks/users";
import { UsersLoader } from "../users-loader";

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const { users, setUsers, pending, search } = useUsers();
  if (pending) return <UsersLoader />;
  return (
    <UsersContext.Provider value={{ users, setUsers, search }}>
      {children}
    </UsersContext.Provider>
  );
}
