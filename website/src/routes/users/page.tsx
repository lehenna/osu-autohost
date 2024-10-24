import { UsersProvider } from "@/components/providers/users";
import { UsersFilters } from "@/components/users-filters";
import { UsersTable } from "@/components/users-table";

export function UsersPage() {
  return (
    <UsersProvider>
      <h2 className="text-2xl font-medium mb-4">Users</h2>
      <UsersFilters />
      <div className="relative overflow-x-auto">
        <UsersTable />
      </div>
    </UsersProvider>
  );
}
