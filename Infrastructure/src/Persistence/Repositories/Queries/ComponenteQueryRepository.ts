import * as Models from "../../Models";
import { ComponenteMapper } from "../../../Mappers/ComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Componente } from "@proodos/domain/Entities/Componente";
import { sequelize } from "../../Config/SequelizeConfig";

export class ComponenteQueryRepository {
  private softDeleteSupported?: boolean;

  constructor(private readonly logger: ILogger) {}

  private async resolveSoftDeleteSupport(): Promise<boolean> {
    if (this.softDeleteSupported !== undefined) {
      return this.softDeleteSupported;
    }

    try {
      const [rows] = await sequelize.query(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'componente' AND COLUMN_NAME IN ('estado','fecha_baja')"
      );
      const columnNames = Array.isArray(rows)
        ? rows.map((row: any) => String(row.COLUMN_NAME || "").toLowerCase())
        : [];
      this.softDeleteSupported =
        columnNames.includes("estado") && columnNames.includes("fecha_baja");
    } catch (error) {
      this.logger.error("[Repository] Failed to resolve soft delete support", error);
      this.softDeleteSupported = false;
    }

    return this.softDeleteSupported;
  }

  private async buildAttributes(): Promise<string[]> {
    const baseAttributes = [
      "id_componente",
      "id_tipo_componente",
      "id_plan",
      "id_tipo_variacion",
      "nombre",
      "fecha_creacion",
    ];

    if (await this.resolveSoftDeleteSupport()) {
      baseAttributes.push("estado", "fecha_baja");
    }

    return baseAttributes;
  }

  async getById(id: number): Promise<Componente | null> {
    this.logger.info("[Repository] ComponenteQueryRepository.getById(id)");

    const row = await Models.ComponenteModel.findOne({
      where: { id_componente: id, estado: "ACTIVO" },
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return row ? ComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Componente[]> {
    this.logger.info("[Repository] ComponenteQueryRepository.getAll()");

    await this.buildAttributes();
    await this.resolveSoftDeleteSupport();

    const rows = await Models.ComponenteModel.findAll({
      where: { estado: "ACTIVO" },
      order: [["id_componente", "DESC"]],
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return rows.map((r: any) => ComponenteMapper.toDomain(r));
  }

  async getByPlan(id_plan: number): Promise<Componente[]> {
    this.logger.info("[Repository] ComponenteQueryRepository.getByPlan(id_plan)");

    await this.buildAttributes();
    await this.resolveSoftDeleteSupport();

    const rows = await Models.ComponenteModel.findAll({
      where: { id_plan, estado: "ACTIVO" },
      order: [["id_componente", "DESC"]],
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return rows.map((r: any) => ComponenteMapper.toDomain(r));
  }
}
