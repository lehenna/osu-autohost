import { OAuth } from "@/lib/oauth";
import { cookies } from "next/headers";
import { findOrCreateUser } from "./find-or-create-user";
import { UserRole } from "@/lib/user-roles";

export async function getUserByToken() {
  const osu_session = (await cookies()).get("osu_session")?.value;
  if (!osu_session) return null;
  const session = await OAuth.user(osu_session);
  if (!session) return null;
  const user = await findOrCreateUser(session);
  return {
    ...user,
    role: user.role as UserRole,
  };
}
