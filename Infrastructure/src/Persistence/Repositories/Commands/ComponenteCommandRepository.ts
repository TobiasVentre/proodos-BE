import * as Models from "../../Models";
import { ComponenteMapper } from "../../../Mappers/ComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PatchComponenteDTO } from "@proodos/application/DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

export class ComponenteCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const payload: Record<string, unknown> = {
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      // en DB ya tenés default; si querés dejarlo a DB, eliminá esta línea
      fecha_creacion: new Date(),
      estado: entity.estado ?? "ACTIVO",
      fecha_baja: entity.fecha_baja ?? null,
    };

    const created = await Models.ComponenteModel.create(payload);

    return ComponenteMapper.toDomain(created);
  }

  async update(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const payload: Record<string, unknown> = {
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      fecha_creacion: entity.fecha_creacion,
      estado: entity.estado,
      fecha_baja: entity.fecha_baja ?? null,
    };

    await Models.ComponenteModel.update(payload, {
      where: { id_componente: entity.id_componente },
    });

    const updated = await Models.ComponenteModel.findByPk(entity.id_componente);

    if (!updated) {
      // Para cumplir el contrato: Promise<Componente>
      throw new NotFoundError(`Componente not found: id_componente=${entity.id_componente}`);
    }

    return ComponenteMapper.toDomain(updated);
  }

  async patch(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    this.logger.info("[Repository] ComponenteCommandRepository.patch()", { id_componente });
    this.logger.debug("[Repository] Patch DTO:", dto);

    // Construimos dinámicamente solo lo que vino
    const updatePayload: Record<string, unknown> = {};

    if (dto.id_tipo_componente !== undefined) updatePayload.id_tipo_componente = dto.id_tipo_componente;
    if (dto.id_plan !== undefined) updatePayload.id_plan = dto.id_plan;
    if (dto.id_tipo_variacion !== undefined) updatePayload.id_tipo_variacion = dto.id_tipo_variacion;
    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.estado !== undefined) updatePayload.estado = dto.estado;
    if (dto.fecha_baja !== undefined) updatePayload.fecha_baja = dto.fecha_baja;

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    await Models.ComponenteModel.update(updatePayload, {
      where: { id_componente },
    });

    const updated = await Models.ComponenteModel.findByPk(id_componente);

    if (!updated) {
      throw new NotFoundError(`Componente not found: id_componente=${id_componente}`);
    }

    return ComponenteMapper.toDomain(updated);
  }

  async delete(id_componente: number): Promise<void> {
    await Models.ComponenteModel.destroy({ where: { id_componente } });
  }

  async softDelete(id_componente: number, fecha_baja: Date, estado: string): Promise<void> {
    await Models.ComponenteModel.update({ fecha_baja, estado }, { where: { id_componente } });
  }
}
