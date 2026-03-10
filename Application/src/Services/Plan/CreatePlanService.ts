import { ICreatePlanDTO } from "../../DTOs/Plan/ICreatePlanDTO";
import { mapCreatePlanDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ICreatePlanUseCase } from "../../Ports/IPlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class CreatePlanService implements ICreatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] CreatePlanService.execute()");
    const plan = mapCreatePlanDTOToEntity(dto);
    return await this.planRepository.create(plan);
  }
}
