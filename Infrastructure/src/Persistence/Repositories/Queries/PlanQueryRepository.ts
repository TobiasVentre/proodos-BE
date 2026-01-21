import * as Models from "../../Models";
import { PlanMapper } from "../../../Mappers/PlanMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class PlanQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_plan: number): Promise<Plan | null> {
    this.logger.info("[Repository] PlanQueryRepository.getById(id)");

    const row = await Models.PlanModel.findByPk(id_plan);

    return row ? PlanMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Plan[]> {
    this.logger.info("[Repository] PlanQueryRepository.getAll()");

    const rows = await Models.PlanModel.findAll({
      order: [["id_plan", "DESC"]],
    });

    return rows.map((row: any) => PlanMapper.toDomain(row));
  }

  async exists(id_plan: number): Promise<boolean> {
    this.logger.info("[Repository] PlanQueryRepository.exists()");

    const count = await Models.PlanModel.count({ where: { id_plan } });

    return count > 0;
  }
}
