import * as Models from "../../Models";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { PatchTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/PatchTipoElementoDTO";
import { TipoElementoMapper } from "../../../Mappers/TipoElementoMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

export class TipoElementoCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: TipoElemento): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoElementoModel.create({
      nombre: entity.nombre,
    });

    return TipoElementoMapper.toDomain(created);
  }

  async update(entity: TipoElemento): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoElementoModel.update(
      {
        nombre: entity.nombre,
      },
      { where: { id_tipo_elemento: entity.id_tipo_elemento } }
    );

    const updated = await Models.TipoElementoModel.findByPk(entity.id_tipo_elemento);

    if (!updated) {
      throw new NotFoundError(
        `TipoElemento not found: id_tipo_elemento=${entity.id_tipo_elemento}`
      );
    }

    return TipoElementoMapper.toDomain(updated);
  }

  async patch(
    id_tipo_elemento: number,
    dto: PatchTipoElementoDTO
  ): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoCommandRepository.patch()", {
      id_tipo_elemento,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoElemento> = {};

    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    await Models.TipoElementoModel.update(updatePayload, {
      where: { id_tipo_elemento },
    });

    const updated = await Models.TipoElementoModel.findByPk(id_tipo_elemento);

    if (!updated) {
      throw new NotFoundError(
        `TipoElemento not found: id_tipo_elemento=${id_tipo_elemento}`
      );
    }

    return TipoElementoMapper.toDomain(updated);
  }

  async delete(id_tipo_elemento: number): Promise<void> {
    this.logger.info("[Repository] TipoElementoCommandRepository.delete()", {
      id_tipo_elemento,
    });

    await Models.TipoElementoModel.destroy({ where: { id_tipo_elemento } });
  }
}
