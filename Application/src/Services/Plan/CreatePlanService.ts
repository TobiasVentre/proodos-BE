import { CreatePlanDTO } from "../../DTOs/Plan/CreatePlanDTO";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { Plan } from "@proodos/domain/Entities/Plan";
import { CreatePlanUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class CreatePlanService implements CreatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] CreatePlanService.execute()");
    return await this.planRepository.create(dto as Plan);
  }
}
