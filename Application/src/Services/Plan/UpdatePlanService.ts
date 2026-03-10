import { IUpdatePlanDTO } from "../../DTOs/Plan/IUpdatePlanDTO";
import { mapUpdatePlanDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { IUpdatePlanUseCase } from "../../Ports/IPlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class UpdatePlanService implements IUpdatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: IUpdatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] UpdatePlanService.execute()");
    const plan = mapUpdatePlanDTOToEntity(dto);
    return await this.planRepository.update(plan);
  }
}
