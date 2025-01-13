import { NextFunction, Request, Response } from "express";
import { ValidateSchemaError } from "./validate-schema";
import { APIError } from "./api-error";

export function createMiddleware(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const regex =
        /^\/(?!_next\/static|_next\/image|favicon\.ico|sitemap\.xml|robots\.txt).*/;
      if (!regex.test(req.url)) {
        next();
        return;
      }
      await callback(req, res, next);
    } catch (error) {
      if (error instanceof ValidateSchemaError) {
        error.createResponse(res);
        return;
      }
      if (error instanceof APIError) {
        error.createResponse(res);
        return;
      }
      res.status(500).json({
        message: "Internal server error.",
      });
    }
  };
}
