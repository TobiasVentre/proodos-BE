import * as Models from "../../Models";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { ElementoComponenteMapper } from "../../../Mappers/ElementoComponenteMapper";
import { ElementoComponenteVariacionMapper } from "../../../Mappers/ElementoComponenteVariacionMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Op } from "sequelize";

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

    const componente = await Models.ComponenteModel.findByPk(id_componente);
    if (!componente) return [];

    const rows = await Models.ElementoComponenteVariacionModel.findAll({
      where: {
        [Op.or]: [
          { id_componente },
          {
            id_tipo_variacion: componente.id_tipo_variacion,
            id_componente: null,
          },
        ],
      },
      include: [{ model: Models.ElementoComponenteModel, as: "elemento", required: true }],
      order: [
        ["id_componente", "ASC"],
        [{ model: Models.ElementoComponenteModel, as: "elemento" }, "orden", "ASC"],
      ],
    });

    const byElemento = new Map<number, ElementoComponente>();
    for (const row of rows as any[]) {
      const elemento = ElementoComponenteMapper.toDomain(row.elemento);
      const mapped = {
        ...elemento,
        id_tipo_variacion: row.id_tipo_variacion,
        id_componente: row.id_componente ?? null,
        metadata: ElementoComponenteVariacionMapper.toDomain(row).metadata,
      };

      const existing = byElemento.get(mapped.id_elemento);
      if (!existing || mapped.id_componente === id_componente) {
        byElemento.set(mapped.id_elemento, mapped);
      }
    }

    return Array.from(byElemento.values()).sort((a, b) => a.orden - b.orden);
  }

  async getAsignacionesByElemento(
    id_elemento: number
  ): Promise<ElementoComponenteVariacion[]> {
    this.logger.info("[Repository] ElementoComponenteQueryRepository.getAsignacionesByElemento()", {
      id_elemento,
    });

    const rows = await Models.ElementoComponenteVariacionModel.findAll({
      where: { id_elemento },
      order: [["id_elemento_componente_variacion", "ASC"]],
    });

    return rows.map((row: any) => ElementoComponenteVariacionMapper.toDomain(row));
  }
}
