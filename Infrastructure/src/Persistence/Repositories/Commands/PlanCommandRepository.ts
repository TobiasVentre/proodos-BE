import * as Models from "../../Models";
import { PlanMapper } from "../../../Mappers/PlanMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";
import { PatchPlanDTO } from "@proodos/application/DTOs/Plan/PatchPlanDTO";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

export class PlanCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: Plan): Promise<Plan> {
    this.logger.info("[Repository] PlanCommandRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.PlanModel.create({
      nombre: entity.nombre,
      capacidad: entity.capacidad,
      capacidad_anterior: entity.capacidad_anterior,
      precio_full_price: entity.precio_full_price,
      precio_oferta: entity.precio_oferta,
      aumento: entity.aumento,
      precio_sin_iva: entity.precio_sin_iva,
    });

    return PlanMapper.toDomain(created);
  }

  async update(entity: Plan): Promise<Plan> {
    this.logger.info("[Repository] PlanCommandRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.PlanModel.update(
      {
        nombre: entity.nombre,
        capacidad: entity.capacidad,
        capacidad_anterior: entity.capacidad_anterior,
        precio_full_price: entity.precio_full_price,
        precio_oferta: entity.precio_oferta,
        aumento: entity.aumento,
        precio_sin_iva: entity.precio_sin_iva,
      },
      { where: { id_plan: entity.id_plan } }
    );

    const updated = await Models.PlanModel.findByPk(entity.id_plan);

    if (!updated) {
      throw new NotFoundError(`Plan not found: id_plan=${entity.id_plan}`);
    }

    return PlanMapper.toDomain(updated);
  }

  async patch(id_plan: number, dto: PatchPlanDTO): Promise<Plan> {
    this.logger.info("[Repository] PlanCommandRepository.patch()", { id_plan });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<Plan> = {};

    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.capacidad !== undefined) updatePayload.capacidad = dto.capacidad;
    if (dto.capacidad_anterior !== undefined) {
      updatePayload.capacidad_anterior = dto.capacidad_anterior;
    }
    if (dto.precio_full_price !== undefined) {
      updatePayload.precio_full_price = dto.precio_full_price;
    }
    if (dto.precio_oferta !== undefined) {
      updatePayload.precio_oferta = dto.precio_oferta;
    }
    if (dto.aumento !== undefined) updatePayload.aumento = dto.aumento;
    if (dto.precio_sin_iva !== undefined) {
      updatePayload.precio_sin_iva = dto.precio_sin_iva;
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new ValidationError("VALIDATION_ERROR", "No fields provided for patch");
    }

    await Models.PlanModel.update(updatePayload, {
      where: { id_plan },
    });

    const updated = await Models.PlanModel.findByPk(id_plan);

    if (!updated) {
      throw new NotFoundError(`Plan not found: id_plan=${id_plan}`);
    }

    return PlanMapper.toDomain(updated);
  }

  async delete(id_plan: number): Promise<void> {
    this.logger.info("[Repository] PlanCommandRepository.delete()", { id_plan });

    await Models.PlanModel.destroy({ where: { id_plan } });
  }
}
