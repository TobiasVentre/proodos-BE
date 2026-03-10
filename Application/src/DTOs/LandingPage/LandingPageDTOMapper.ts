import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { ValidationError } from "../../Errors/ValidationError";
import { ICreateLandingPageDTO } from "./ICreateLandingPageDTO";
import { IUpdateLandingPageDTO } from "./IUpdateLandingPageDTO";

type LandingPageField = "URL" | "estado" | "segmento";

export const ensureLandingPageField = (
  field: LandingPageField,
  value: string
): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError("VALIDATION_ERROR", `${field} must be a non-empty string`, {
      field,
    });
  }

  return value.trim();
};

const ensureLandingPageId = (id_landing: number): number => {
  if (typeof id_landing !== "number" || !Number.isInteger(id_landing) || id_landing <= 0) {
    throw new ValidationError(
      "VALIDATION_ERROR",
      "id_landing must be a positive integer",
      { field: "id_landing" }
    );
  }

  return id_landing;
};

export const mapCreateLandingPageDTOToEntity = (
  dto: ICreateLandingPageDTO
): LandingPage => ({
  id_landing: 0,
  URL: ensureLandingPageField("URL", dto.URL),
  estado: ensureLandingPageField("estado", dto.estado),
  segmento: ensureLandingPageField("segmento", dto.segmento),
});

export const mapUpdateLandingPageDTOToEntity = (
  dto: IUpdateLandingPageDTO
): LandingPage => ({
  id_landing: ensureLandingPageId(dto.id_landing),
  URL: ensureLandingPageField("URL", dto.URL),
  estado: ensureLandingPageField("estado", dto.estado),
  segmento: ensureLandingPageField("segmento", dto.segmento),
});
