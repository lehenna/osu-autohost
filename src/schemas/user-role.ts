import { UserRoles } from "@/lib/user-roles";
import { check, object, pipe, string } from "valibot";

export const userRoleSchema = object({
  role: pipe(
    string(),
    check(
      (role) => Object.keys(UserRoles.roles).includes(role),
      "Role not found."
    )
  ),
});
