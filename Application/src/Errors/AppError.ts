export type ErrorDetails = Record<string, unknown>;

export class AppError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: ErrorDetails;

  constructor(code: string, message: string, status: number, details?: ErrorDetails) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    this.name = "AppError";
  }
}
