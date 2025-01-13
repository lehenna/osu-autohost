import { Authorize } from "@lehenna/authorize";

export type UserRole = keyof typeof UserRoles.roles;

export type UserPermission = Parameters<typeof UserRoles.can>[1];

export const UserRoles = new Authorize(
  {
    rooms: {
      list: "",
      create: "",
      update: "",
      remove: "",
    },
    users: {
      list: "",
      ban: "",
      update: "",
    },
  },
  {
    master: {
      all: true,
    },
    admin: {
      rooms: true,
      users: true,
    },
    moder: {
      rooms: {
        list: true,
      },
      users: true,
    },
    user: {
      rooms: {
        list: true,
      },
    },
  }
);
