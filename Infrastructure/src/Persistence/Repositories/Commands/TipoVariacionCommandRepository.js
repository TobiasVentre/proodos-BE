"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVariacionCommandRepository = void 0;
const Models = require("../../Models");
const TipoVariacionMapper_1 = require("../../../Mappers/TipoVariacionMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class TipoVariacionCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
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
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoVariacionCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoVariacionModel.update({
            id_tipo_componente: entity.id_tipo_componente,
            nombre: entity.nombre,
            descripcion: entity.descripcion,
            css_url: entity.css_url,
            js_url: entity.js_url,
            html: entity.html,
        }, { where: { id_tipo_variacion: entity.id_tipo_variacion } });
        const updated = await Models.TipoVariacionModel.findByPk(entity.id_tipo_variacion);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoVariacion not found: id_tipo_variacion=${entity.id_tipo_variacion}`);
        }
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(updated);
    }
    async patch(id_tipo_variacion, dto) {
        this.logger.info("[Repository] TipoVariacionCommandRepository.patch()", {
            id_tipo_variacion,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.id_tipo_componente !== undefined) {
            updatePayload.id_tipo_componente = dto.id_tipo_componente;
        }
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.descripcion !== undefined)
            updatePayload.descripcion = dto.descripcion;
        if (dto.css_url !== undefined)
            updatePayload.css_url = dto.css_url;
        if (dto.js_url !== undefined)
            updatePayload.js_url = dto.js_url;
        if (dto.html !== undefined)
            updatePayload.html = dto.html;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.TipoVariacionModel.update(updatePayload, {
            where: { id_tipo_variacion },
        });
        const updated = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoVariacion not found: id_tipo_variacion=${id_tipo_variacion}`);
        }
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(updated);
    }
}
exports.TipoVariacionCommandRepository = TipoVariacionCommandRepository;
