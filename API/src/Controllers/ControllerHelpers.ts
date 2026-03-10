import { Response } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { buildNotFoundError, buildValidationError } from "./ControllerErrors";

type HttpPayload = Record<string, unknown>;

const asPayload = (body: unknown): HttpPayload =>
  typeof body === "object" && body !== null ? (body as HttpPayload) : {};

export const parsePositiveInteger = (value: unknown, field = "id"): number => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw buildValidationError(`Invalid ${field}`);
  }

  return parsed;
};

export const parseOptionalPositiveInteger = (
  value: unknown,
  field: string
): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return parsePositiveInteger(value, field);
};

export const ensureRequiredFields = (
  body: unknown,
  requiredFields: string[]
): void => {
  const payload = asPayload(body);
  const missingFields = requiredFields.filter(
    (field) => payload[field] === undefined || payload[field] === null
  );

  if (missingFields.length > 0) {
    throw buildValidationError("Missing required fields", {
      required: missingFields,
    });
  }
};

export const ensureFound = <T>(value: T | null | undefined, message: string): T => {
  if (value === null || value === undefined) {
    throw buildNotFoundError(message);
  }

  return value;
};

export const respondOk = (res: Response, data?: unknown) =>
  data === undefined
    ? res.status(200).json({ message: "OK" })
    : res.status(200).json({ message: "OK", data });

export const respondCreated = (res: Response, data?: unknown) =>
  data === undefined
    ? res.status(201).json({ message: "OK" })
    : res.status(201).json({ message: "OK", data });

export const respondNoContent = (res: Response) => res.status(204).send();

export const logControllerError = (
  logger: ILogger,
  action: string,
  error: unknown
): void => {
  logger.error(`[Controller] ${action} failed`, error);
};
