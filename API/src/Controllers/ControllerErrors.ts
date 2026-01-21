import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";

type ErrorDetails = Record<string, unknown>;

export const buildValidationError = (message: string, details?: ErrorDetails) =>
  new ValidationError("VALIDATION_ERROR", message, details);

export const buildNotFoundError = (message: string, details?: ErrorDetails) =>
  new NotFoundError(message, details);
