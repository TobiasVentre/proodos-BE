import * as Models from "../Models";
import { PlanMapper } from "../../Mappers/PlanMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";

export class PlanRepository implements IPlanRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: Plan): Promise<Plan> {
    this.logger.info("[Repository] PlanRepository.create()");
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
    this.logger.info("[Repository] PlanRepository.update()");
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
      throw new Error(`Plan not found: id_plan=${entity.id_plan}`);
    }

    return PlanMapper.toDomain(updated);
  }

  async getById(id_plan: number): Promise<Plan | null> {
    this.logger.info("[Repository] PlanRepository.getById(id)");

    const row = await Models.PlanModel.findByPk(id_plan);

    return row ? PlanMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Plan[]> {
    this.logger.info("[Repository] PlanRepository.getAll()");

    const rows = await Models.PlanModel.findAll({
      order: [["id_plan", "DESC"]],
    });

    return rows.map((row: any) => PlanMapper.toDomain(row));
  }

  async exists(id_plan: number): Promise<boolean> {
    this.logger.info("[Repository] PlanRepository.exists()");

    const count = await Models.PlanModel.count({ where: { id_plan } });

    return count > 0;
  }
}
