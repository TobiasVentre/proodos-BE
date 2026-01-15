import { CreateComponenteDTO } from "../../DTOs/Componente/CreateComponenteDTO";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { CreateComponenteUseCase } from "../../Ports/ComponenteUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ValidationError } from "../../Errors/ValidationError";

export class CreateComponenteService implements CreateComponenteUseCase {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateComponenteDTO): Promise<Componente> {
    this.logger.info("[Service] CreateComponenteService.execute()");
    const planExists = await this.planRepository.exists(dto.id_plan);
    if (!planExists) {
      throw new ValidationError("IC-04", "Plan no existe");
    }
    return await this.componenteRepository.create(dto as Componente);
  }
}
