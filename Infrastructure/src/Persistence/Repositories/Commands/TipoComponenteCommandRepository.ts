import * as Models from "../../Models";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { PatchTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/PatchTipoComponenteDTO";
import { TipoComponenteMapper } from "../../../Mappers/TipoComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

export class TipoComponenteCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: TipoComponente): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoComponenteModel.create({
      nombre: entity.nombre,
      estado: entity.estado,
    });

    return TipoComponenteMapper.toDomain(created);
  }

  async update(entity: TipoComponente): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoComponenteModel.update(
      {
        nombre: entity.nombre,
        estado: entity.estado,
      },
      { where: { id_tipo_componente: entity.id_tipo_componente } }
    );

    const updated = await Models.TipoComponenteModel.findByPk(
      entity.id_tipo_componente
    );

    if (!updated) {
      throw new NotFoundError(
        `TipoComponente not found: id_tipo_componente=${entity.id_tipo_componente}`
      );
    }

    return TipoComponenteMapper.toDomain(updated);
  }

  async patch(
    id_tipo_componente: number,
    dto: PatchTipoComponenteDTO
  ): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteCommandRepository.patch()", {
      id_tipo_componente,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoComponente> = {};

    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.estado !== undefined) updatePayload.estado = dto.estado;

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    await Models.TipoComponenteModel.update(updatePayload, {
      where: { id_tipo_componente },
    });

    const updated = await Models.TipoComponenteModel.findByPk(id_tipo_componente);

    if (!updated) {
      throw new NotFoundError(
        `TipoComponente not found: id_tipo_componente=${id_tipo_componente}`
      );
    }

    return TipoComponenteMapper.toDomain(updated);
  }
}
