import { AppError, ErrorDetails } from "./AppError";

export class ExternalServiceError extends AppError {
  constructor(code: string, message: string, details?: ErrorDetails) {
    super(code, message, 502, details);
    this.name = "ExternalServiceError";
  }
}
