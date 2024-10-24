import { NextFunction, Request, Response } from "express";

export function validateRole(role: UserRole) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    if (req.user.role === "admin") {
      next();
      return;
    }
    if (req.user.role !== role) {
      res.status(403).json({
        message: `Role "${role}" is required.`,
      });
      return;
    }
    next();
  };
}
