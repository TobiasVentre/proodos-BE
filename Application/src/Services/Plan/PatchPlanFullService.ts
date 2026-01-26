import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { PatchPlanFullDTO } from "../../DTOs/Plan/PatchPlanFullDTO";
import { Plan } from "@proodos/domain/Entities/Plan";
import { PatchPlanFullUseCase } from "../../Ports/PlanUseCases";

export class PatchPlanFullService implements PatchPlanFullUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_plan: number, dto: PatchPlanFullDTO): Promise<Plan> {
    this.logger.info("[Service] PatchPlanFullService.execute()", { id_plan });
    return await this.planRepository.patchFull(id_plan, dto);
  }
}
