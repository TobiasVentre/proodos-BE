import * as Models from "../../Models";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { TipoVariacionMapper } from "../../../Mappers/TipoVariacionMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoVariacionQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getById(id_tipo_variacion: number): Promise<TipoVariacion | null> {
    this.logger.info("[Repository] TipoVariacionQueryRepository.getById()");

    const row = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);

    return row ? TipoVariacionMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoVariacion[]> {
    this.logger.info("[Repository] TipoVariacionQueryRepository.getAll()");

    const rows = await Models.TipoVariacionModel.findAll({
      order: [["id_tipo_variacion", "DESC"]],
    });

    return rows.map((row: any) => TipoVariacionMapper.toDomain(row));
  }

  async getByTipoComponente(id_tipo_componente: number): Promise<TipoVariacion[]> {
    this.logger.info("[Repository] TipoVariacionQueryRepository.getByTipoComponente()", {
      id_tipo_componente,
    });

    const rows = await Models.TipoVariacionModel.findAll({
      where: { id_tipo_componente },
      order: [["id_tipo_variacion", "DESC"]],
    });

    return rows.map((row: any) => TipoVariacionMapper.toDomain(row));
  }
}
