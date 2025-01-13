"use client";

import { UsersTable } from "@/components/tables/users/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useUsers } from "@/hooks/users";

export function ListUsers() {
  const { users, pending } = useUsers();
  if (pending) {
    return (
      <div className="flex items-center justify-center w-full h-16">
        <Spinner />
      </div>
    );
  }
  if (users.length === 0) {
    return (
      <>
        <h4 className="font-medium mb-4">Oh no!</h4>
        <p className="text-zinc-400">
          There are no users available to show at this time.
        </p>
      </>
    );
  }
  return (
    <>
      <UsersTable users={users} />
    </>
  );
}
