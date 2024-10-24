import { useSessionContext } from "@/context/session";
import { UserAvatar } from "./user-avatar";
import { Link } from "react-router-dom";

export function SessionCard() {
  const { user } = useSessionContext();
  return (
    <aside className="relative flex items-center justify-between gap-2 border-2 border-dashed border-zinc-900 rounded-md p-4 mb-4">
      <header className="relative flex items-center gap-2.5">
        <UserAvatar userId={user?.id} username={user?.username} />
        <section className="relative grid">
          <h3 className="text-xl font-medium">{user?.username}</h3>
          <p className="text-sm flex items-center gap-2">
            <span className="font-medium">ROLE:</span>
            <span className="relative text-amber-500 uppercase">
              {user?.role}
            </span>
          </p>
        </section>
      </header>
      <Link
        className="relative text-xs font-medium text-red-500 bg-red-500/20 hover:bg-red-500/30 transition-[background-color] rounded-md px-2.5 h-8 grid place-items-center"
        to="/api/oauth/logout"
      >
        LOG OUT
      </Link>
    </aside>
  );
}
