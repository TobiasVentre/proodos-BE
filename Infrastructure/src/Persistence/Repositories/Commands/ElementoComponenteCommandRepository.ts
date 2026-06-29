import * as Models from "../../Models";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IPatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { ElementoComponenteMapper } from "../../../Mappers/ElementoComponenteMapper";
import { ElementoComponenteVariacionMapper } from "../../../Mappers/ElementoComponenteVariacionMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { sequelize } from "../../../Config/SequelizeConfig";

export class ElementoComponenteCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: ElementoComponente): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.ElementoComponenteModel.create({
      id_tipo_elemento: entity.id_tipo_elemento,
      nombre: entity.nombre,
      selector: entity.selector,
      icono_img: entity.icono_img,
      descripcion: entity.descripcion,
      link: entity.link,
      orden: entity.orden,
      css_url: entity.css_url,
      js_url: entity.js_url,
      contrato_minimo: entity.contrato_minimo
        ? JSON.stringify(entity.contrato_minimo)
        : null,
    });

    return ElementoComponenteMapper.toDomain(created);
  }

  async update(entity: ElementoComponente): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.ElementoComponenteModel.update(
      {
        id_tipo_elemento: entity.id_tipo_elemento,
        nombre: entity.nombre,
        selector: entity.selector,
        icono_img: entity.icono_img,
        descripcion: entity.descripcion,
        link: entity.link,
        orden: entity.orden,
        css_url: entity.css_url,
        js_url: entity.js_url,
        contrato_minimo: entity.contrato_minimo
          ? JSON.stringify(entity.contrato_minimo)
          : null,
      },
      { where: { id_elemento: entity.id_elemento } }
    );

    const updated = await Models.ElementoComponenteModel.findByPk(entity.id_elemento);

    if (!updated) {
      throw new NotFoundError(
        `ElementoComponente not found: id_elemento=${entity.id_elemento}`
      );
    }

    return ElementoComponenteMapper.toDomain(updated);
  }

  async patch(
    id_elemento: number,
    dto: IPatchElementoComponenteDTO
  ): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.patch()", {
      id_elemento,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<ElementoComponente> = {};

    if (dto.id_tipo_elemento !== undefined) {
      updatePayload.id_tipo_elemento = dto.id_tipo_elemento;
    }
    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.selector !== undefined) updatePayload.selector = dto.selector;
    if (dto.icono_img !== undefined) updatePayload.icono_img = dto.icono_img;
    if (dto.descripcion !== undefined) updatePayload.descripcion = dto.descripcion;
    if (dto.link !== undefined) updatePayload.link = dto.link;
    if (dto.orden !== undefined) updatePayload.orden = dto.orden;
    if (dto.css_url !== undefined) updatePayload.css_url = dto.css_url;
    if (dto.js_url !== undefined) updatePayload.js_url = dto.js_url;
    if (dto.contrato_minimo !== undefined) {
      updatePayload.contrato_minimo = dto.contrato_minimo;
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    const persistencePayload = {
      ...updatePayload,
      ...(dto.contrato_minimo !== undefined
        ? {
            contrato_minimo: dto.contrato_minimo
              ? JSON.stringify(dto.contrato_minimo)
              : null,
          }
        : {}),
    };

    await Models.ElementoComponenteModel.update(persistencePayload, {
      where: { id_elemento },
    });

    const updated = await Models.ElementoComponenteModel.findByPk(id_elemento);

    if (!updated) {
      throw new NotFoundError(`ElementoComponente not found: id_elemento=${id_elemento}`);
    }

    return ElementoComponenteMapper.toDomain(updated);
  }

  async delete(id_elemento: number): Promise<void> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.delete()", {
      id_elemento,
    });

    await Models.ElementoComponenteModel.destroy({ where: { id_elemento } });
  }

  async replaceAsignaciones(
    id_elemento: number,
    asignaciones: ElementoComponenteVariacion[]
  ): Promise<ElementoComponenteVariacion[]> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.replaceAsignaciones()", {
      id_elemento,
    });

    return sequelize.transaction(async (transaction) => {
      await Models.ElementoComponenteVariacionModel.destroy({
        where: { id_elemento },
        transaction,
      });

      if (asignaciones.length > 0) {
        await Models.ElementoComponenteVariacionModel.bulkCreate(
          asignaciones.map((asignacion) => ({
            id_elemento,
            id_tipo_variacion: asignacion.id_tipo_variacion,
            id_componente: asignacion.id_componente,
            metadata: JSON.stringify(asignacion.metadata ?? {}),
          })),
          { transaction }
        );
      }

      const rows = await Models.ElementoComponenteVariacionModel.findAll({
        where: { id_elemento },
        order: [["id_elemento_componente_variacion", "ASC"]],
        transaction,
      });

      return rows.map((row: any) => ElementoComponenteVariacionMapper.toDomain(row));
    });
  }

  async upsertAsignacion(
    asignacion: ElementoComponenteVariacion
  ): Promise<ElementoComponenteVariacion> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.upsertAsignacion()", {
      id_elemento: asignacion.id_elemento,
      id_tipo_variacion: asignacion.id_tipo_variacion,
      id_componente: asignacion.id_componente,
    });

    const where = {
      id_elemento: asignacion.id_elemento,
      id_tipo_variacion: asignacion.id_tipo_variacion,
      id_componente: asignacion.id_componente,
    };

    const metadata = JSON.stringify(asignacion.metadata ?? {});
    const existing = await Models.ElementoComponenteVariacionModel.findOne({ where });

    if (existing) {
      await existing.update({ metadata });
      return ElementoComponenteVariacionMapper.toDomain(existing);
    }

    const created = await Models.ElementoComponenteVariacionModel.create({
      ...where,
      metadata,
    });

    return ElementoComponenteVariacionMapper.toDomain(created);
  }

  async deleteAsignacion(
    id_elemento: number,
    id_tipo_variacion: number,
    id_componente: number | null
  ): Promise<void> {
    this.logger.info("[Repository] ElementoComponenteCommandRepository.deleteAsignacion()", {
      id_elemento,
      id_tipo_variacion,
      id_componente,
    });

    await Models.ElementoComponenteVariacionModel.destroy({
      where: {
        id_elemento,
        id_tipo_variacion,
        id_componente,
      },
    });
  }
}
