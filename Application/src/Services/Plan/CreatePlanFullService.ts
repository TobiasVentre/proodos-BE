import { CreatePlanFullDTO } from "../../DTOs/Plan/CreatePlanFullDTO";
import { mapCreatePlanFullDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";
import { CreatePlanFullUseCase } from "../../Ports/PlanUseCases";

export class CreatePlanFullService implements CreatePlanFullUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreatePlanFullDTO): Promise<Plan> {
    this.logger.info("[Service] CreatePlanFullService.execute()");
    const plan = mapCreatePlanFullDTOToEntity(dto);
    return await this.planRepository.create(plan);
  }
}
