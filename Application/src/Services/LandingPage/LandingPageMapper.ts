import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { CreateLandingPageCommand } from "../../DTOs/LandingPage/CreateLandingPageCommand";
import { UpdateLandingPageCommand } from "../../DTOs/LandingPage/UpdateLandingPageCommand";
import { ValidationError } from "../../Errors/ValidationError";

const ensureNonEmptyString = (field: string, value: string): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError("VALIDATION_ERROR", `${field} must be a non-empty string`, {
      field,
    });
  }

  return value.trim();
};

const ensurePositiveInteger = (field: string, value: number): number => {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new ValidationError("VALIDATION_ERROR", `${field} must be a positive integer`, {
      field,
    });
  }

  return value;
};

export const LandingPageMapper = {
  fromCreateCommand(dto: CreateLandingPageCommand): LandingPage {
    const landing = new LandingPage();

    landing.URL = ensureNonEmptyString("URL", dto.URL);
    landing.estado = ensureNonEmptyString("estado", dto.estado);
    landing.segmento = ensureNonEmptyString("segmento", dto.segmento);

    return landing;
  },
  fromUpdateCommand(dto: UpdateLandingPageCommand): LandingPage {
    const landing = new LandingPage();

    landing.id_landing = ensurePositiveInteger("id_landing", dto.id_landing);
    landing.URL = ensureNonEmptyString("URL", dto.URL);
    landing.estado = ensureNonEmptyString("estado", dto.estado);
    landing.segmento = ensureNonEmptyString("segmento", dto.segmento);

    return landing;
  },
};
