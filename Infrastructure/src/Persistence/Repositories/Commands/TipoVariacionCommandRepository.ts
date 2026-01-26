import * as Models from "../../Models";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ITipoVariacionRepository } from "@proodos/application/Interfaces/ITipoVariacionRepository";
import { PatchTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { TipoVariacionMapper } from "../../../Mappers/TipoVariacionMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

export class TipoVariacionCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: TipoVariacion): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoVariacionModel.create({
      id_tipo_componente: entity.id_tipo_componente,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      css_url: entity.css_url,
      js_url: entity.js_url,
      html: entity.html,
    });

    return TipoVariacionMapper.toDomain(created);
  }

  async update(entity: TipoVariacion): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoVariacionModel.update(
      {
        id_tipo_componente: entity.id_tipo_componente,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        css_url: entity.css_url,
        js_url: entity.js_url,
        html: entity.html,
      },
      { where: { id_tipo_variacion: entity.id_tipo_variacion } }
    );

    const updated = await Models.TipoVariacionModel.findByPk(
      entity.id_tipo_variacion
    );

    if (!updated) {
      throw new NotFoundError(
        `TipoVariacion not found: id_tipo_variacion=${entity.id_tipo_variacion}`
      );
    }

    return TipoVariacionMapper.toDomain(updated);
  }

  async patch(
    id_tipo_variacion: number,
    dto: PatchTipoVariacionDTO
  ): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionCommandRepository.patch()", {
      id_tipo_variacion,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoVariacion> = {};

    if (dto.id_tipo_componente !== undefined) {
      updatePayload.id_tipo_componente = dto.id_tipo_componente;
    }
    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.descripcion !== undefined) updatePayload.descripcion = dto.descripcion;
    if (dto.css_url !== undefined) updatePayload.css_url = dto.css_url;
    if (dto.js_url !== undefined) updatePayload.js_url = dto.js_url;
    if (dto.html !== undefined) updatePayload.html = dto.html;

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    await Models.TipoVariacionModel.update(updatePayload, {
      where: { id_tipo_variacion },
    });

    const updated = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);

    if (!updated) {
      throw new NotFoundError(
        `TipoVariacion not found: id_tipo_variacion=${id_tipo_variacion}`
      );
    }

    return TipoVariacionMapper.toDomain(updated);
  }

  async delete(id_tipo_variacion: number): Promise<void> {
    this.logger.info("[Repository] TipoVariacionCommandRepository.delete()", {
      id_tipo_variacion,
    });

    await Models.TipoVariacionModel.destroy({ where: { id_tipo_variacion } });
  }
}
