import { UpdatePlanDTO } from "../../DTOs/Plan/UpdatePlanDTO";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { Plan } from "@proodos/domain/Entities/Plan";
import { UpdatePlanUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class UpdatePlanService implements UpdatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: UpdatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] UpdatePlanService.execute()");
    return await this.planRepository.update(dto as Plan);
  }
}
