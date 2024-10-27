import { Request, Response, NextFunction } from "express";

type ErrorHandlerType = {
  message?: string;
  code?: number;
  details?: unknown;
};

export class ServerError extends Error {
  readonly code: number;
  readonly details?: any;

  constructor({ message, code, details }: ErrorHandlerType) {
    super(message);
    this.code = code || 500;
    this.details = details || {};
  }
}

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ServerError) {
    console.error("Server Error: ", err);
    res.status(err.code).send({ message: err.message, details: err.details });
  } else {
    console.error("Unknown error : ", err);
    res.status(500).send({ message: "Unknown error occured" });
  }
};
