import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IAssignLandingComponenteResult } from "../../DTOs/LandingComponente/IAssignLandingComponenteResult";
import {
  buildAssignLandingComponenteResult,
  mapLandingComponenteDTOToEntity,
} from "../../DTOs/LandingComponente/LandingComponenteDTOMapper";
import { ILandingComponenteDTO } from "../../DTOs/LandingComponente/ILandingComponenteDTO";
import { IAssignLandingComponenteUseCase } from "../../Ports/ILandingComponenteUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { NotFoundError } from "../../Errors/NotFoundError";

export class AssignLandingComponenteService implements IAssignLandingComponenteUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly landingComponenteRepository: ILandingComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ILandingComponenteDTO): Promise<IAssignLandingComponenteResult> {
    const entity = mapLandingComponenteDTOToEntity(dto);

    this.logger.info("[Service] AssignLandingComponenteService.execute()", entity);

    const landing = await this.landingPageRepository.getById(entity.id_landing);
    if (!landing) throw new NotFoundError("Landing not found");

    const componente = await this.componenteRepository.getById(entity.id_componente);
    if (!componente) throw new NotFoundError("Componente not found");

    const already = await this.landingComponenteRepository.exists(
      entity.id_landing,
      entity.id_componente
    );
    if (already) {
      return buildAssignLandingComponenteResult(entity, true);
    }

    const data = await this.landingComponenteRepository.assign(entity);
    return buildAssignLandingComponenteResult(data, false);
  }
}
