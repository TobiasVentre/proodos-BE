import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

import { LandingPageModel } from "../../Models";
import { LandingPageMapper } from "../../../Mappers/LandingPageMapper";

export class LandingPageCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: LandingPage): Promise<LandingPage> {
    this.logger.info("[Repository] LandingPageCommandRepository.create()");

    const created = await LandingPageModel.create({
      URL: entity.URL,
      estado: entity.estado,
      segmento: entity.segmento,
    });

    return LandingPageMapper.toDomain(created);
  }

  async update(entity: LandingPage): Promise<LandingPage> {
    this.logger.info("[Repository] LandingPageCommandRepository.update()", {
      id_landing: entity.id_landing,
    });

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
    return updated ? LandingPageMapper.toDomain(updated) : (null as any);
  }

  async delete(id_landing: number): Promise<void> {
    this.logger.info("[Repository] LandingPageCommandRepository.delete()", { id_landing });
    await LandingPageModel.destroy({ where: { id_landing } });
  }
}
