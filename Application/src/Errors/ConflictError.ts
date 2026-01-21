import { AppError, ErrorDetails } from "./AppError";

export class ConflictError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super("CONFLICT", message, 409, details);
    this.name = "ConflictError";
  }
}
