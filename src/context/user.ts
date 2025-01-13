import { UserRole } from "@/lib/user-roles";
import { User } from "@prisma/client";
import { createContext, useContext } from "react";

export const UserContext = createContext({} as User & { role: UserRole });

export function useUserContext() {
  return useContext(UserContext);
}
