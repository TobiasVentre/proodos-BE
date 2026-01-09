import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

import { LandingPageModel } from "../Models";
import { LandingPageMapper } from "../../Mappers/LandingPageMapper";

export class LandingPageRepository implements ILandingPageRepository {
  async create(entity: LandingPage): Promise<LandingPage> {
    const created = await LandingPageModel.create({
      URL: entity.URL,
      estado: entity.estado,
      segmento: entity.segmento,
    });

    return LandingPageMapper.toDomain(created);
  }

  async update(entity: LandingPage): Promise<LandingPage> {
    await LandingPageModel.update(
      {
        URL: entity.URL,
        estado: entity.estado,
        segmento: entity.segmento,
      },
      {
        where: { id_landing: entity.id_landing },
      }
    );

    const updated = await LandingPageModel.findByPk(entity.id_landing);
    return updated ? LandingPageMapper.toDomain(updated) : null as any;
  }

  async delete(id_landing: number): Promise<void> {
    await LandingPageModel.destroy({ where: { id_landing } });
  }

  async getById(id_landing: number): Promise<LandingPage | null> {
    const row = await LandingPageModel.findByPk(id_landing);
    return row ? LandingPageMapper.toDomain(row) : null;
  }

  async getAll(): Promise<LandingPage[]> {
    const rows = await LandingPageModel.findAll();
    return rows.map((r) => LandingPageMapper.toDomain(r));
  }
}
