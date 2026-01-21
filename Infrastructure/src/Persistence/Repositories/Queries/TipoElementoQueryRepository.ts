import * as Models from "../../Models";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { TipoElementoMapper } from "../../../Mappers/TipoElementoMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoElementoQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_tipo_elemento: number): Promise<TipoElemento | null> {
    this.logger.info("[Repository] TipoElementoQueryRepository.getById()");

    const row = await Models.TipoElementoModel.findByPk(id_tipo_elemento);

    return row ? TipoElementoMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoElemento[]> {
    this.logger.info("[Repository] TipoElementoQueryRepository.getAll()");

    const rows = await Models.TipoElementoModel.findAll({
      order: [["id_tipo_elemento", "DESC"]],
    });

    return rows.map((row: any) => TipoElementoMapper.toDomain(row));
  }

  async exists(id_tipo_elemento: number): Promise<boolean> {
    this.logger.info("[Repository] TipoElementoQueryRepository.exists()");

    const count = await Models.TipoElementoModel.count({
      where: { id_tipo_elemento },
    });

    return count > 0;
  }
}
