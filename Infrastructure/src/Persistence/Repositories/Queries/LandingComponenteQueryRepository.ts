import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingComponenteModel, LandingPageModel, ComponenteModel } from "../../Models";
import { LandingComponenteMapper } from "../../../Mappers/LandingComponenteMapper";

export class LandingComponenteQueryRepository {
  constructor(private readonly logger: ILogger) {}

  private readonly includeRelations = [
    { model: LandingPageModel, as: "landing", required: false },
    { model: ComponenteModel, as: "componente", required: false },
  ];

  async getByLanding(id_landing: number): Promise<LandingComponente[]> {
    this.logger.info("[Repository] LandingComponenteQueryRepository.getByLanding()", {
      id_landing,
    });

    const rows = await LandingComponenteModel.findAll({
      where: { id_landing },
      include: this.includeRelations,
      order: [["id_componente", "DESC"]],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async getByComponente(id_componente: number): Promise<LandingComponente[]> {
    this.logger.info("[Repository] LandingComponenteQueryRepository.getByComponente()", {
      id_componente,
    });

    const rows = await LandingComponenteModel.findAll({
      where: { id_componente },
      include: this.includeRelations,
      order: [["id_landing", "DESC"]],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async exists(id_landing: number, id_componente: number): Promise<boolean> {
    this.logger.info("[Repository] LandingComponenteQueryRepository.exists()", {
      id_landing,
      id_componente,
    });

    const row = await LandingComponenteModel.findOne({
      where: { id_landing, id_componente },
    });

    return row !== null;
  }

  async existsByComponente(id_componente: number): Promise<boolean> {
    this.logger.info("[Repository] LandingComponenteQueryRepository.existsByComponente()", {
      id_componente,
    });

    const row = await LandingComponenteModel.findOne({
      where: { id_componente },
    });

    return row !== null;
  }
}
