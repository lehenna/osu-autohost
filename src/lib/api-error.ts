import { Response } from "express";

export class APIError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  createResponse(res: Response) {
    return res.status(this.status).json({
      message: this.message,
    });
  }
}
