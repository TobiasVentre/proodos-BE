import { ICreateComponenteDTO } from "../../DTOs/Componente/ICreateComponenteDTO";
import { mapCreateComponenteDTOToEntity } from "../../DTOs/Componente/ComponenteDTOMapper";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { ICreateComponenteUseCase } from "../../Ports/IComponenteUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ensurePlanExists } from "./ensurePlanExists";

export class CreateComponenteService implements ICreateComponenteUseCase {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreateComponenteDTO): Promise<Componente> {
    this.logger.info("[Service] CreateComponenteService.execute()");
    await ensurePlanExists(this.planRepository, dto.id_plan);
    const entity = mapCreateComponenteDTOToEntity(dto);
    return this.componenteRepository.create(entity);
  }
}
