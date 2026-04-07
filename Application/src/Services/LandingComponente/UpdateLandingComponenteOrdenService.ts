import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ILandingComponenteDTO } from "../../DTOs/LandingComponente/ILandingComponenteDTO";
import { mapLandingComponenteDTOToEntity } from "../../DTOs/LandingComponente/LandingComponenteDTOMapper";
import { IUpdateLandingComponenteOrdenUseCase } from "../../Ports/ILandingComponenteUseCases";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { ValidationError } from "../../Errors/ValidationError";

export class UpdateLandingComponenteOrdenService
  implements IUpdateLandingComponenteOrdenUseCase
{
  constructor(
    private readonly landingComponenteRepository: ILandingComponenteRepository
  ) {}

  async execute(dto: ILandingComponenteDTO): Promise<LandingComponente> {
    const entity = mapLandingComponenteDTOToEntity(dto);

    if (!entity.orden) {
      throw new ValidationError("VALIDATION_ERROR", "orden must be a positive integer", {
        field: "orden",
      });
    }

    return this.landingComponenteRepository.updateOrden(
      entity.id_landing,
      entity.id_componente,
      entity.orden
    );
  }
}
