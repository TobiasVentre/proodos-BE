import * as Models from "../../Models";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { TipoComponenteMapper } from "../../../Mappers/TipoComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoComponenteQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_tipo_componente: number): Promise<TipoComponente | null> {
    this.logger.info("[Repository] TipoComponenteQueryRepository.getById()");

    const row = await Models.TipoComponenteModel.findByPk(id_tipo_componente);

    return row ? TipoComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoComponente[]> {
    this.logger.info("[Repository] TipoComponenteQueryRepository.getAll()");

    const rows = await Models.TipoComponenteModel.findAll({
      order: [["id_tipo_componente", "DESC"]],
    });

    return rows.map((row: any) => TipoComponenteMapper.toDomain(row));
  }

  async exists(id_tipo_componente: number): Promise<boolean> {
    this.logger.info("[Repository] TipoComponenteQueryRepository.exists()");

    const count = await Models.TipoComponenteModel.count({
      where: { id_tipo_componente },
    });

    return count > 0;
  }
}
