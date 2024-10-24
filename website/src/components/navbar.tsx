import { Link } from "react-router-dom";
import { NavbarLink } from "./navbar-link";
import { CrownIcon } from "./ui/crown";

export function Navbar() {
  return (
    <header className="relative h-20 w-full flex items-center justify-between px-4">
      <h1 className="text-2xl font-semibold select-none">
        <Link className="flex items-center gap-2" to="/">
          <span className="text-violet-500 text-3xl">
            <CrownIcon />
          </span>
          Osu Autohost
        </Link>
      </h1>
      <nav className="flex items-center gap-4">
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/users">Users</NavbarLink>
      </nav>
    </header>
  );
}
