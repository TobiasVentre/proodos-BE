import { Componente } from "@proodos/domain/Entities/Componente";
import { ValidationError } from "../../Errors/ValidationError";
import { ICreateComponenteDTO } from "./ICreateComponenteDTO";
import { IUpdateComponenteDTO } from "./IUpdateComponenteDTO";

type ComponenteIdField =
  | "id_componente"
  | "id_tipo_componente"
  | "id_plan"
  | "id_tipo_variacion";

const ensurePositiveInteger = (
  field: ComponenteIdField,
  value: number
): number => {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new ValidationError(
      "VALIDATION_ERROR",
      `${field} must be a positive integer`,
      { field }
    );
  }

  return value;
};

const ensureNonEmptyString = (field: "nombre", value: string): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(
      "VALIDATION_ERROR",
      `${field} must be a non-empty string`,
      { field }
    );
  }

  return value.trim();
};

const buildBaseComponente = (): Pick<
  Componente,
  "fecha_creacion" | "estado" | "fecha_baja"
> => ({
  fecha_creacion: new Date(0),
  estado: "ACTIVO",
  fecha_baja: null,
});

export const mapCreateComponenteDTOToEntity = (
  dto: ICreateComponenteDTO
): Componente => ({
  id_componente: 0,
  id_tipo_componente: ensurePositiveInteger(
    "id_tipo_componente",
    dto.id_tipo_componente
  ),
  id_plan: ensurePositiveInteger("id_plan", dto.id_plan),
  id_tipo_variacion: ensurePositiveInteger(
    "id_tipo_variacion",
    dto.id_tipo_variacion
  ),
  nombre: ensureNonEmptyString("nombre", dto.nombre),
  ...buildBaseComponente(),
});

export const mapUpdateComponenteDTOToEntity = (
  dto: IUpdateComponenteDTO
): Componente => ({
  id_componente: ensurePositiveInteger("id_componente", dto.id_componente),
  id_tipo_componente: ensurePositiveInteger(
    "id_tipo_componente",
    dto.id_tipo_componente
  ),
  id_plan: ensurePositiveInteger("id_plan", dto.id_plan),
  id_tipo_variacion: ensurePositiveInteger(
    "id_tipo_variacion",
    dto.id_tipo_variacion
  ),
  nombre: ensureNonEmptyString("nombre", dto.nombre),
  ...buildBaseComponente(),
});
