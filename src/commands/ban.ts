import { db } from "@/lib/database";
import { UserRole, UserRoles } from "@/lib/user-roles";
import { CreateCommandFunction } from "@/models/room";

export const banCommand: CreateCommandFunction = (room) => {
  return {
    name: "ban",
    role: "moder",
    exec: async (user, userId) => {
      if (!userId || !userId.startsWith("#")) {
        await room.send(`${user.username}, User ID is required.`);
        return;
      }
      const userToBan = await db.user.findFirst({
        where: {
          id: parseInt(userId),
        },
      });
      if (!userToBan) {
        await room.send(`${user.username}, User not found.`);
        return;
      }
      const compareUsers = UserRoles.compare(
        user.role as UserRole,
        userToBan.role as UserRole
      );
      if (compareUsers !== 1) {
        await room.send(`${user.username}, User is restricted.`);
        return;
      }
      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          banned: !user.banned,
        },
      });
      if (updatedUser.banned) {
        await room.send(`${user.username}, User was banned.`);
        return;
      }
      await room.send(`${user.username}, User was unbanned.`);
    },
  };
};
