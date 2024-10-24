import {
  ChangeEventHandler,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export interface UsersContextValue {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  search: ChangeEventHandler<HTMLInputElement>;
}

export const UsersContext = createContext({} as UsersContextValue);

export function useUsersContext() {
  return useContext(UsersContext);
}
