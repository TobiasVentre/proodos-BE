import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { DeletePlanUseCase } from "../../Ports/PlanUseCases";

export class DeletePlanService implements DeletePlanUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(id_plan: number): Promise<void> {
    await this.planRepository.delete(id_plan);
  }
}
