import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { IPatchLandingPageDTO } from "../../DTOs/LandingPage/IPatchLandingPageDTO";
import { ensureLandingPageField } from "../../DTOs/LandingPage/LandingPageDTOMapper";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { NotFoundError } from "../../Errors/NotFoundError";
import { IPatchLandingPageUseCase } from "../../Ports/ILandingPageUseCases";
import { ValidationError } from "../../Errors/ValidationError";

export class PatchLandingPageService implements IPatchLandingPageUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number, dto: IPatchLandingPageDTO): Promise<LandingPage> {
    const existing = await this.landingPageRepository.getById(id_landing);

    if (!existing) {
      throw new NotFoundError("Landing not found");
    }

    if (Object.keys(dto).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided", {
        required: ["URL", "estado", "segmento"],
      });
    }

    const updated: LandingPage = {
      ...existing,
      URL: dto.URL !== undefined ? ensureLandingPageField("URL", dto.URL) : existing.URL,
      estado:
        dto.estado !== undefined ? ensureLandingPageField("estado", dto.estado) : existing.estado,
      segmento:
        dto.segmento !== undefined
          ? ensureLandingPageField("segmento", dto.segmento)
          : existing.segmento,
    };

    return this.landingPageRepository.update(updated);
  }
}
