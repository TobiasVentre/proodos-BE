import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";
import { ValidationError } from "../../Errors/ValidationError";
import { IAssignComponenteHijoResult } from "./IAssignComponenteHijoResult";
import { IComponenteHijoDTO } from "./IComponenteHijoDTO";

const ensurePositiveInteger = (
  field: "id_padre" | "id_hijo",
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

export const mapComponenteHijoDTOToEntity = (
  dto: IComponenteHijoDTO
): ComponenteCompuesto => ({
  id_padre: ensurePositiveInteger("id_padre", dto.id_padre),
  id_hijo: ensurePositiveInteger("id_hijo", dto.id_hijo),
});

export const buildAssignComponenteHijoResult = (
  data: ComponenteCompuesto,
  created: boolean
): IAssignComponenteHijoResult => ({
  data,
  created,
});
