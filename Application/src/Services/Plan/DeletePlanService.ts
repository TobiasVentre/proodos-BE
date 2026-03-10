import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { IDeletePlanUseCase } from "../../Ports/IPlanUseCases";

export class DeletePlanService implements IDeletePlanUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(id_plan: number): Promise<void> {
    await this.planRepository.delete(id_plan);
  }
}
