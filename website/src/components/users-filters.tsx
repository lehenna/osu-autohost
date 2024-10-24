import { useUsersContext } from "@/context/users";
import { Input } from "./ui/input";

export function UsersFilters() {
  const { search } = useUsersContext();
  return (
    <header className="mb-4">
      <Input
        onChange={search}
        name="username"
        id="username"
        placeholder="Search..."
      />
    </header>
  );
}
