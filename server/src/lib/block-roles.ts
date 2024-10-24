import { getSettings } from "./settings";

export async function blockRoles(user: User): Promise<UserRole[]> {
  const settings = await getSettings();
  const roles: UserRole[] = [];
  if (user.username === settings.username) return roles;
  if (user.role === "admin") roles.push("admin");
  if (user.role === "moder") roles.push("admin", "moder");
  if (user.role === "user") roles.push("admin", "moder", "user");
  return roles;
}
