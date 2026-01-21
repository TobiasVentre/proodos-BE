"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteCommandRepository = void 0;
const Models = require("../../Models");
const ComponenteMapper_1 = require("../../../Mappers/ComponenteMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class ComponenteCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] ComponenteCommandRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const payload = {
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
        return ComponenteMapper_1.ComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] ComponenteCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const payload = {
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
            throw new NotFoundError_1.NotFoundError(`Componente not found: id_componente=${entity.id_componente}`);
        }
        return ComponenteMapper_1.ComponenteMapper.toDomain(updated);
    }
    async patch(id_componente, dto) {
        this.logger.info("[Repository] ComponenteCommandRepository.patch()", { id_componente });
        this.logger.debug("[Repository] Patch DTO:", dto);
        // Construimos dinámicamente solo lo que vino
        const updatePayload = {};
        if (dto.id_tipo_componente !== undefined)
            updatePayload.id_tipo_componente = dto.id_tipo_componente;
        if (dto.id_plan !== undefined)
            updatePayload.id_plan = dto.id_plan;
        if (dto.id_tipo_variacion !== undefined)
            updatePayload.id_tipo_variacion = dto.id_tipo_variacion;
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.estado !== undefined)
            updatePayload.estado = dto.estado;
        if (dto.fecha_baja !== undefined)
            updatePayload.fecha_baja = dto.fecha_baja;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.ComponenteModel.update(updatePayload, {
            where: { id_componente },
        });
        const updated = await Models.ComponenteModel.findByPk(id_componente);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`Componente not found: id_componente=${id_componente}`);
        }
        return ComponenteMapper_1.ComponenteMapper.toDomain(updated);
    }
    async delete(id_componente) {
        await Models.ComponenteModel.destroy({ where: { id_componente } });
    }
    async softDelete(id_componente, fecha_baja, estado) {
        await Models.ComponenteModel.update({ fecha_baja, estado }, { where: { id_componente } });
    }
}
exports.ComponenteCommandRepository = ComponenteCommandRepository;
