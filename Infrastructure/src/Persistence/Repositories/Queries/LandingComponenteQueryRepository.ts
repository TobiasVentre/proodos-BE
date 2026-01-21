import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingComponenteModel, LandingPageModel, ComponenteModel } from "../../Models";
import { LandingComponenteMapper } from "../../../Mappers/LandingComponenteMapper";

export class LandingComponenteQueryRepository {
  async getByLanding(id_landing: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_landing },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async getByComponente(id_componente: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_componente },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async exists(id_landing: number, id_componente: number): Promise<boolean> {
    const row = await LandingComponenteModel.findOne({
      where: { id_landing, id_componente },
    });

    return row !== null;
  }

  async existsByComponente(id_componente: number): Promise<boolean> {
    const row = await LandingComponenteModel.findOne({
      where: { id_componente },
    });

    return row !== null;
  }
}
