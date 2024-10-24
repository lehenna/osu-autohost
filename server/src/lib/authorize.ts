import { BanchoUser, BanchoPlayer } from "../bancho";

export function userHasBlockRole(
  user: BanchoUser | BanchoPlayer,
  blockRoles: UserRole[]
) {
  let currentUser = user instanceof BanchoPlayer ? user.user : user;
  return blockRoles?.includes(currentUser.role);
}

export function affectedUserIsSameAsCurrentUser(
  user: BanchoUser | BanchoPlayer,
  currentUser?: User
) {
  if (!currentUser) return false;
  let affectedUser = user instanceof BanchoPlayer ? user.user : user;
  return affectedUser.id === currentUser.id;
}
