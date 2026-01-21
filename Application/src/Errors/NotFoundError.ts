import { AppError, ErrorDetails } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super("NOT_FOUND", message, 404, details);
    this.name = "NotFoundError";
  }
}
