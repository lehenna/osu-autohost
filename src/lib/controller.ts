import { Request, Response } from "express";
import { ValidateSchemaError } from "./validate-schema";
import { APIError } from "./api-error";

export function createController(
  callback: (req: Request, res: Response) => Promise<void>
) {
  return async (req: Request, res: Response) => {
    try {
      await callback(req, res);
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
