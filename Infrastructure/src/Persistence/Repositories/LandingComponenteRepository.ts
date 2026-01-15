import { ILandingComponenteRepository } from "@proodos/application/Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

import { LandingComponenteModel } from "../Models";
import { LandingComponenteMapper } from "../../Mappers/LandingComponenteMapper";

export class LandingComponenteRepository implements ILandingComponenteRepository {
  async assign(entity: LandingComponente): Promise<LandingComponente> {
    const created = await LandingComponenteModel.create({
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    });

    return LandingComponenteMapper.toDomain(created);
  }

  async unassign(id_landing: number, id_componente: number): Promise<void> {
    await LandingComponenteModel.destroy({
      where: { id_landing, id_componente },
    });
  }

  async getByLanding(id_landing: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_landing },
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async getByComponente(id_componente: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_componente },
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
