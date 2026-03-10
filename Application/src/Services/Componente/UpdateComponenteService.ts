import { IUpdateComponenteDTO } from "../../DTOs/Componente/IUpdateComponenteDTO";
import { mapUpdateComponenteDTOToEntity } from "../../DTOs/Componente/ComponenteDTOMapper";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IUpdateComponenteUseCase } from "../../Ports/IComponenteUseCases";
import { ensurePlanExists } from "./ensurePlanExists";

export class UpdateComponenteService implements IUpdateComponenteUseCase {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: IUpdateComponenteDTO): Promise<Componente> {
    this.logger.info("[Service] UpdateComponenteService.execute()");
    await ensurePlanExists(this.planRepository, dto.id_plan);
    const entity = mapUpdateComponenteDTOToEntity(dto);
    return this.componenteRepository.update(entity);
  }
}
