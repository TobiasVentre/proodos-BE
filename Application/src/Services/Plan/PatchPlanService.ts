import { IPatchPlanDTO } from "../../DTOs/Plan/IPatchPlanDTO";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { IPatchPlanUseCase } from "../../Ports/IPlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class PatchPlanService implements IPatchPlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_plan: number, dto: IPatchPlanDTO): Promise<Plan> {
    this.logger.info("[Service] PatchPlanService.execute()", { id_plan });
    return await this.planRepository.patch(id_plan, dto);
  }
}
