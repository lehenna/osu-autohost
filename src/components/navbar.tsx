import { Brand } from "./brand";
import { UserDropdown } from "./user-dropdown";

export function Navbar() {
  return (
    <header className="relative flex justify-between items-center gap-4">
      <Brand />
      <UserDropdown />
    </header>
  );
}
