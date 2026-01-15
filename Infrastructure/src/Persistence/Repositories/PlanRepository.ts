import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PlanModel } from "../Models";

export class PlanRepository implements IPlanRepository {
  constructor(private readonly logger: ILogger) {}

  async exists(id_plan: number): Promise<boolean> {
    this.logger.info("[Repository] PlanRepository.exists()", { id_plan });
    const plan = await PlanModel.findByPk(id_plan);
    return Boolean(plan);
  }
}
