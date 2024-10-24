import { Link, useLocation } from "react-router-dom";

export interface NavbarLinkOptions {
  href: string;
  children: React.ReactNode;
}

export function NavbarLink({ href, children }: NavbarLinkOptions) {
  const { pathname } = useLocation();
  return (
    <Link
      data-actived={pathname === href}
      className="relative block font-medium text-zinc-400 hover:text-zinc-100 transition-[color] data-[actived=true]:text-zinc-50 before:content-[' '] before:rounded-full before:absolute before:w-full before:h-[.15rem] before:-bottom-1 data-[actived=true]:before:bg-violet-500"
      to={href}
    >
      {children}
    </Link>
  );
}
