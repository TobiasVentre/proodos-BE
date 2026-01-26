import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { PatchPlanDTO } from "@proodos/application/DTOs/Plan/PatchPlanDTO";
import { PlanCommandRepository } from "./Commands/PlanCommandRepository";
import { PlanQueryRepository } from "./Queries/PlanQueryRepository";

export class PlanRepository implements IPlanRepository {
  private readonly commandRepository: PlanCommandRepository;
  private readonly queryRepository: PlanQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new PlanCommandRepository(logger);
    this.queryRepository = new PlanQueryRepository(logger);
  }

  async create(entity: Plan): Promise<Plan> {
    return this.commandRepository.create(entity);
  }

  async update(entity: Plan): Promise<Plan> {
    return this.commandRepository.update(entity);
  }

  async patch(id_plan: number, dto: PatchPlanDTO): Promise<Plan> {
    return this.commandRepository.patch(id_plan, dto);
  }

  async getById(id_plan: number): Promise<Plan | null> {
    return this.queryRepository.getById(id_plan);
  }

  async getAll(): Promise<Plan[]> {
    return this.queryRepository.getAll();
  }

  async exists(id_plan: number): Promise<boolean> {
    return this.queryRepository.exists(id_plan);
  }

  async delete(id_plan: number): Promise<void> {
    return this.commandRepository.delete(id_plan);
  }
}
