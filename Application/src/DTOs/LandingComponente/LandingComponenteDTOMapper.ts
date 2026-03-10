import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { ValidationError } from "../../Errors/ValidationError";
import { IAssignLandingComponenteResult } from "./IAssignLandingComponenteResult";
import { ILandingComponenteDTO } from "./ILandingComponenteDTO";

const ensurePositiveInteger = (field: "id_landing" | "id_componente", value: number): number => {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new ValidationError(
      "VALIDATION_ERROR",
      `${field} must be a positive integer`,
      { field }
    );
  }

  return value;
};

export const mapLandingComponenteDTOToEntity = (
  dto: ILandingComponenteDTO
): LandingComponente => ({
  id_landing: ensurePositiveInteger("id_landing", dto.id_landing),
  id_componente: ensurePositiveInteger("id_componente", dto.id_componente),
});

export const buildAssignLandingComponenteResult = (
  data: LandingComponente,
  existed: boolean
): IAssignLandingComponenteResult => ({
  data,
  existed,
});
