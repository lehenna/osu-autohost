import { useState } from "react";
import { useUsersContext } from "@/context/users";
import { UsersTableItem } from "./users-table-item";
import { Pagination } from "./pagination";

export function UsersTable() {
  const { users } = useUsersContext();
  const [page, setPage] = useState(1);
  return (
    <>
      <ul className="relative grid border-2 border-zinc-800 rounded-md w-full min-w-[35rem] mb-4">
        <li className="grid grid-cols-4 gap-2.5 h-8 px-2.5 items-center bg-zinc-900">
          <span className="font-medium text-sm">ID</span>
          <span className="font-medium text-sm">Username</span>
          <span className="font-medium text-sm">Play time</span>
          <span className="font-medium text-sm">Role</span>
        </li>
        {users.slice((page - 1) * 10, page * 10).map((user) => (
          <li key={user.id}>
            <UsersTableItem {...user} />
          </li>
        ))}
      </ul>
      {users.length > 10 ? (
        <Pagination page={page} setPage={setPage} size={users.length} />
      ) : null}
    </>
  );
}
