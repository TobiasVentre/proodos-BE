import { ContratoMinimoElemento } from "@proodos/domain/Entities/ContratoMinimoElemento";
import { ValidationError } from "../../Errors/ValidationError";

const allowedTypes = new Set(["string", "number", "boolean", "object", "array"]);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getValueType = (value: unknown): string => {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
};

export const ensureContratoMinimoDefinitionIsValid = (
  contrato: ContratoMinimoElemento | null | undefined
): void => {
  if (contrato === null || contrato === undefined) return;
  if (!isPlainObject(contrato)) {
    throw new ValidationError("VALIDATION_ERROR", "contrato_minimo must be an object");
  }

  if (contrato.required !== undefined) {
    if (!Array.isArray(contrato.required) || !contrato.required.every((item) => typeof item === "string")) {
      throw new ValidationError(
        "VALIDATION_ERROR",
        "contrato_minimo.required must be an array of strings"
      );
    }
  }

  if (contrato.fields !== undefined) {
    if (!isPlainObject(contrato.fields)) {
      throw new ValidationError("VALIDATION_ERROR", "contrato_minimo.fields must be an object");
    }

    for (const [fieldName, fieldDefinition] of Object.entries(contrato.fields)) {
      if (!fieldName || !isPlainObject(fieldDefinition)) {
        throw new ValidationError(
          "VALIDATION_ERROR",
          "contrato_minimo.fields entries must be objects"
        );
      }
      if (!allowedTypes.has(String(fieldDefinition.type))) {
        throw new ValidationError(
          "VALIDATION_ERROR",
          `Invalid contrato_minimo type for field: ${fieldName}`
        );
      }
      if (
        fieldDefinition.nullable !== undefined &&
        typeof fieldDefinition.nullable !== "boolean"
      ) {
        throw new ValidationError(
          "VALIDATION_ERROR",
          `contrato_minimo nullable must be boolean for field: ${fieldName}`
        );
      }
    }
  }
};

export const ensureMetadataMatchesContratoMinimo = (
  contrato: ContratoMinimoElemento | null | undefined,
  metadata: Record<string, unknown>
): void => {
  ensureContratoMinimoDefinitionIsValid(contrato);
  if (!contrato) return;

  for (const fieldName of contrato.required ?? []) {
    if (!(fieldName in metadata) || metadata[fieldName] === undefined) {
      throw new ValidationError(
        "VALIDATION_ERROR",
        `Missing required metadata field: ${fieldName}`
      );
    }
  }

  for (const [fieldName, fieldDefinition] of Object.entries(contrato.fields ?? {}) as [
    string,
    { type: string; nullable?: boolean }
  ][]) {
    if (!(fieldName in metadata) || metadata[fieldName] === undefined) continue;

    const value = metadata[fieldName];
    if (value === null) {
      if (fieldDefinition.nullable === true) continue;
      throw new ValidationError(
        "VALIDATION_ERROR",
        `Metadata field cannot be null: ${fieldName}`
      );
    }

    const actualType = getValueType(value);
    if (actualType !== fieldDefinition.type) {
      throw new ValidationError(
        "VALIDATION_ERROR",
        `Invalid metadata type for field: ${fieldName}`,
        { expected: fieldDefinition.type, actual: actualType }
      );
    }
  }
};
