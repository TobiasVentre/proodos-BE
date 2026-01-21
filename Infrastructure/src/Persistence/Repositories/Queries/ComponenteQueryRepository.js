"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteQueryRepository = void 0;
const Models = require("../../Models");
const ComponenteMapper_1 = require("../../../Mappers/ComponenteMapper");
const SequelizeConfig_1 = require("../../Config/SequelizeConfig");
class ComponenteQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async resolveSoftDeleteSupport() {
        if (this.softDeleteSupported !== undefined) {
            return this.softDeleteSupported;
        }
        try {
            const [rows] = await SequelizeConfig_1.sequelize.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'componente' AND COLUMN_NAME IN ('estado','fecha_baja')");
            const columnNames = Array.isArray(rows)
                ? rows.map((row) => String(row.COLUMN_NAME || "").toLowerCase())
                : [];
            this.softDeleteSupported =
                columnNames.includes("estado") && columnNames.includes("fecha_baja");
        }
        catch (error) {
            this.logger.error("[Repository] Failed to resolve soft delete support", error);
            this.softDeleteSupported = false;
        }
        return this.softDeleteSupported;
    }
    async buildAttributes() {
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
    async getById(id) {
        this.logger.info("[Repository] ComponenteQueryRepository.getById(id)");
        const row = await Models.ComponenteModel.findOne({
            where: { id_componente: id, estado: "ACTIVO" },
            include: [
                { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
                { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
                { model: Models.PlanModel, as: "plan", required: false },
            ],
        });
        return row ? ComponenteMapper_1.ComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
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
        return rows.map((r) => ComponenteMapper_1.ComponenteMapper.toDomain(r));
    }
    async getByPlan(id_plan) {
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
        return rows.map((r) => ComponenteMapper_1.ComponenteMapper.toDomain(r));
    }
}
exports.ComponenteQueryRepository = ComponenteQueryRepository;
