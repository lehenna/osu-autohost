import { msToString } from "@/lib/formater";
import { UserEditRole } from "./user-edit-role";
import { useSessionContext } from "@/context/session";

export function UsersTableItem(user: User) {
  const { user: session } = useSessionContext();
  return (
    <article className="grid grid-cols-4 gap-2.5 px-2.5 items-center h-8 border-t border-zinc-800">
      <p className="text-sm font-medium">{user.id}</p>
      <h4 className="text-sm">{user.username}</h4>
      <p className="text-sm">{msToString(user.playtime)}</p>
      <p className="text-sm flex items-center gap-1">
        {user.role}
        {!session?.blockRoles?.includes(user.role) &&
        session?.id !== user.id ? (
          <UserEditRole userId={user.id} role={user.role} />
        ) : null}
      </p>
    </article>
  );
}
