import { Request, NextFunction, Response } from "express";
import { UserPermission, UserRole, UserRoles } from "@/lib/user-roles";

export function validateUserPermission(permission: UserPermission) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const authorized = UserRoles.can(user.role as UserRole, permission);
    if (!authorized) {
      res.status(401).json({
        message: "Permission denied.",
      });
      return;
    }
    next();
  };
}
