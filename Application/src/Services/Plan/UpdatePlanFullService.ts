import { IUpdatePlanFullDTO } from "../../DTOs/Plan/IUpdatePlanFullDTO";
import { mapUpdatePlanFullDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { IUpdatePlanFullUseCase } from "../../Ports/IPlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class UpdatePlanFullService implements IUpdatePlanFullUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: IUpdatePlanFullDTO): Promise<Plan> {
    this.logger.info("[Service] UpdatePlanFullService.execute()");
    const plan = mapUpdatePlanFullDTOToEntity(dto);
    return await this.planRepository.updateFull(plan);
  }
}
