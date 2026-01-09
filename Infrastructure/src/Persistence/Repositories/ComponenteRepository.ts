import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Componente } from "@proodos/domain/Entities/Componente";

import {
  ComponenteModel,
  TipoComponenteModel,
  TipoVariacionModel,
} from "../Models";

import { ComponenteMapper } from "../../Mappers/ComponenteMapper";

export class ComponenteRepository implements IComponenteRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await ComponenteModel.create({
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      fecha_creacion:new Date() 
    });

    return ComponenteMapper.toDomain(created);
  }

  async update(entity: Componente): Promise<Componente> {
    await ComponenteModel.update(
      {
        id_tipo_componente: entity.id_tipo_componente,
        id_plan: entity.id_plan,
        id_tipo_variacion: entity.id_tipo_variacion,
        nombre: entity.nombre,
        fecha_creacion: entity.fecha_creacion,
      },
      {
        where: { id_componente: entity.id_componente },
      }
    );

    const updated = await ComponenteModel.findByPk(entity.id_componente);

    return updated ? ComponenteMapper.toDomain(updated) : null as any;
  }

  async delete(id_componente: number): Promise<void> {
    await ComponenteModel.destroy({ where: { id_componente } });
  }

  async getById(id: number): Promise<Componente | null> {
    const row = await ComponenteModel.findByPk(id, {
      include: [
        { model: TipoComponenteModel, as: "tipoComponente" },
        { model: TipoVariacionModel, as: "tipoVariacion" },
      ],
    });

    return row ? ComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Componente[]> {
    const rows = await ComponenteModel.findAll({
      include: [
        { model: TipoComponenteModel, as: "tipoComponente" },
        { model: TipoVariacionModel, as: "tipoVariacion" },
      ],
    });

    return rows.map((r: ComponenteModel) => ComponenteMapper.toDomain(r));
  }
}
