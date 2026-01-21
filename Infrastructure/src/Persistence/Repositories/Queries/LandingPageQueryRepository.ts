import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

import { LandingPageModel } from "../../Models";
import { LandingPageMapper } from "../../../Mappers/LandingPageMapper";

export class LandingPageQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_landing: number): Promise<LandingPage | null> {
    this.logger.info("[Repository] LandingPageQueryRepository.getById()", { id_landing });
    const row = await LandingPageModel.findByPk(id_landing);
    return row ? LandingPageMapper.toDomain(row) : null;
  }

  async getAll(): Promise<LandingPage[]> {
    this.logger.info("[Repository] LandingPageQueryRepository.getAll()");

    const rows = await LandingPageModel.findAll({
      order: [["id_landing", "DESC"]],
    });

    return rows.map((r) => LandingPageMapper.toDomain(r));
  }
}
