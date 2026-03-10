import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ILandingComponenteDTO } from "../../DTOs/LandingComponente/ILandingComponenteDTO";
import { mapLandingComponenteDTOToEntity } from "../../DTOs/LandingComponente/LandingComponenteDTOMapper";
import { IUnassignLandingComponenteUseCase } from "../../Ports/ILandingComponenteUseCases";

export class UnassignComponenteFromLandingService implements IUnassignLandingComponenteUseCase {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(dto: ILandingComponenteDTO): Promise<void> {
    const entity = mapLandingComponenteDTOToEntity(dto);
    await this.landingComponenteRepository.unassign(entity.id_landing, entity.id_componente);
  }
}
