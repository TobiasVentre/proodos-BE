import { ICreatePlanFullDTO } from "../../DTOs/Plan/ICreatePlanFullDTO";
import { mapCreatePlanFullDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";
import { ICreatePlanFullUseCase } from "../../Ports/IPlanUseCases";

export class CreatePlanFullService implements ICreatePlanFullUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreatePlanFullDTO): Promise<Plan> {
    this.logger.info("[Service] CreatePlanFullService.execute()");
    const plan = mapCreatePlanFullDTOToEntity(dto);
    return await this.planRepository.create(plan);
  }
}
