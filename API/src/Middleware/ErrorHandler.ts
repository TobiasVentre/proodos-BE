import { NextFunction, Request, Response } from "express";
import { AppError } from "@proodos/application/Errors/AppError";

type ErrorResponse = {
  error: true;
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

const buildErrorResponse = (error: AppError): ErrorResponse => {
  const payload: ErrorResponse = {
    error: true,
    code: error.code,
    message: error.message,
  };

  if (error.details) {
    payload.details = error.details;
  }

  return payload;
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: true,
      code: "INVALID_JSON",
      message: "Invalid JSON body",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json(buildErrorResponse(err));
  }

  console.error("[Controller] Unhandled error:", err);

  return res.status(500).json({
    error: true,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};
