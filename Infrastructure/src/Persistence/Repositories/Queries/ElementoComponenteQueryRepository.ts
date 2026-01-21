import * as Models from "../../Models";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteMapper } from "../../../Mappers/ElementoComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class ElementoComponenteQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_elemento: number): Promise<ElementoComponente | null> {
    this.logger.info("[Repository] ElementoComponenteQueryRepository.getById()");

    const row = await Models.ElementoComponenteModel.findByPk(id_elemento);

    return row ? ElementoComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<ElementoComponente[]> {
    this.logger.info("[Repository] ElementoComponenteQueryRepository.getAll()");

    const rows = await Models.ElementoComponenteModel.findAll({
      order: [["id_elemento", "DESC"]],
    });

    return rows.map((row: any) => ElementoComponenteMapper.toDomain(row));
  }

  async getByComponente(id_componente: number): Promise<ElementoComponente[]> {
    this.logger.info("[Repository] ElementoComponenteQueryRepository.getByComponente()", {
      id_componente,
    });

    const rows = await Models.ElementoComponenteModel.findAll({
      where: { id_componente },
      order: [["orden", "ASC"]],
    });

    return rows.map((row: any) => ElementoComponenteMapper.toDomain(row));
  }
}
