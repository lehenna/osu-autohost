import { createContext, useContext } from "react";

export interface SessionContextValue {
  user: (User & { blockRoles: UserRole[] }) | null;
}

export const SessionContext = createContext({} as SessionContextValue);

export function useSessionContext() {
  return useContext(SessionContext);
}
