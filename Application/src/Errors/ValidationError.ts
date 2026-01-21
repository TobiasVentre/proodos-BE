import { AppError, ErrorDetails } from "./AppError";

export class ValidationError extends AppError {
  constructor(code: string, message: string, details?: ErrorDetails) {
    super(code, message, 400, details);
    this.name = "ValidationError";
  }
}
