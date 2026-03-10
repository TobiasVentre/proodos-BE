import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { IPatchPlanFullDTO } from "../../DTOs/Plan/IPatchPlanFullDTO";
import { Plan } from "@proodos/domain/Entities/Plan";
import { IPatchPlanFullUseCase } from "../../Ports/IPlanUseCases";

export class PatchPlanFullService implements IPatchPlanFullUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_plan: number, dto: IPatchPlanFullDTO): Promise<Plan> {
    this.logger.info("[Service] PatchPlanFullService.execute()", { id_plan });
    return await this.planRepository.patchFull(id_plan, dto);
  }
}
