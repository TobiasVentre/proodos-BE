import * as Models from "../Models";
import { ComponenteMapper } from "../../Mappers/ComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PatchComponenteDTO } from "@proodos/application/DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";

export class ComponenteRepository implements IComponenteRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.ComponenteModel.create({
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      // en DB ya tenés default; si querés dejarlo a DB, eliminá esta línea
      fecha_creacion: new Date(),
    });

    return ComponenteMapper.toDomain(created);
  }

  async update(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.ComponenteModel.update(
      {
        id_tipo_componente: entity.id_tipo_componente,
        id_plan: entity.id_plan,
        id_tipo_variacion: entity.id_tipo_variacion,
        nombre: entity.nombre,
        fecha_creacion: entity.fecha_creacion,
      },
      { where: { id_componente: entity.id_componente } }
    );

    const updated = await Models.ComponenteModel.findByPk(entity.id_componente);

    if (!updated) {
      // Para cumplir el contrato: Promise<Componente>
      throw new Error(`Componente not found: id_componente=${entity.id_componente}`);
    }

    return ComponenteMapper.toDomain(updated);
  }

  async patch(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
  this.logger.info("[Repository] ComponenteRepository.patch()", { id_componente });
  this.logger.debug("[Repository] Patch DTO:", dto);

  // Construimos dinámicamente solo lo que vino
  const updatePayload: any = {};

  if (dto.id_tipo_componente !== undefined) updatePayload.id_tipo_componente = dto.id_tipo_componente;
  if (dto.id_plan !== undefined) updatePayload.id_plan = dto.id_plan;
  if (dto.id_tipo_variacion !== undefined) updatePayload.id_tipo_variacion = dto.id_tipo_variacion;
  if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;

  // Si no vino nada, no hacemos nada (o podés lanzar error 400 desde Service/Controller)
  if (Object.keys(updatePayload).length === 0) {
    throw new Error("No fields provided for patch");
  }

  await Models.ComponenteModel.update(updatePayload, {
    where: { id_componente },
  });

  const updated = await Models.ComponenteModel.findByPk(id_componente);

  if (!updated) {
    throw new Error(`Componente not found: id_componente=${id_componente}`);
  }

  return ComponenteMapper.toDomain(updated);
}

  async delete(id_componente: number): Promise<void> {
    await Models.ComponenteModel.destroy({ where: { id_componente } });
  }

  async getById(id: number): Promise<Componente | null> {
    this.logger.info("[Repository] ComponenteRepository.getById(id)");

    const row = await Models.ComponenteModel.findByPk(id, {
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        // Si todavía no tenés la asociación a plan, NO lo incluyas aún.
        // { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return row ? ComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Componente[]> {
    this.logger.info("[Repository] ComponenteRepository.getAll()");

    const rows = await Models.ComponenteModel.findAll({
      order: [["id_componente", "DESC"]],
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        // { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return rows.map((r: any) => ComponenteMapper.toDomain(r));
  }
}
