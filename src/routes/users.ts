import { db } from "@/lib/database";
import { UserRole, UserRoles } from "@/lib/user-roles";
import { validateSchema } from "@/lib/validate-schema";
import { websocket } from "@/lib/websocket";
import { validateUserPermission } from "@/middleware/validate-user-permission";
import { userRoleSchema } from "@/schemas/user-role";
import { Router } from "express";

const UsersRoutes = Router();

UsersRoutes.get("/me", (req, res) => {
  res.status(200).json(req.user);
});

UsersRoutes.get("/", validateUserPermission("users.list"), async (req, res) => {
  const users = await db.user.findMany();
  res.status(200).json(users);
});

UsersRoutes.put(
  "/:userId",
  validateUserPermission("users.update"),
  async (req, res) => {
    const { userId } = req.params;
    const data = await validateSchema(userRoleSchema, req.body);
    const user = await db.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }
    const compareUsers = UserRoles.compare(
      req.user.role,
      user.role as UserRole
    );
    if (compareUsers !== 1) {
      res.status(401).json({
        message: "User is restricted.",
      });
      return;
    }
    const compareRoles = UserRoles.compare(
      req.user.role,
      data.role as UserRole
    );
    if (compareRoles !== 1) {
      res.status(401).json({
        message: "Role is restricted.",
      });
      return;
    }
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: data.role,
      },
    });
    websocket.emit("userUpdated", updatedUser);
    res.status(200).json(updatedUser);
  }
);

UsersRoutes.delete(
  "/:userId/ban",
  validateUserPermission("users.ban" as any),
  async (req, res) => {
    const { userId } = req.params;
    const user = await db.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }
    const compareUsers = UserRoles.compare(
      req.user.role,
      user.role as UserRole
    );
    if (compareUsers !== 1) {
      res.status(401).json({
        message: "User is restricted.",
      });
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
    websocket.emit("userUpdated", updatedUser);
    res.status(200).json(updatedUser);
  }
);

export { UsersRoutes };
