"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoElementoCommandRepository = void 0;
const Models = require("../../Models");
const TipoElementoMapper_1 = require("../../../Mappers/TipoElementoMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class TipoElementoCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] TipoElementoCommandRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.TipoElementoModel.create({
            nombre: entity.nombre,
        });
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoElementoCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoElementoModel.update({
            nombre: entity.nombre,
        }, { where: { id_tipo_elemento: entity.id_tipo_elemento } });
        const updated = await Models.TipoElementoModel.findByPk(entity.id_tipo_elemento);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoElemento not found: id_tipo_elemento=${entity.id_tipo_elemento}`);
        }
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(updated);
    }
    async patch(id_tipo_elemento, dto) {
        this.logger.info("[Repository] TipoElementoCommandRepository.patch()", {
            id_tipo_elemento,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.TipoElementoModel.update(updatePayload, {
            where: { id_tipo_elemento },
        });
        const updated = await Models.TipoElementoModel.findByPk(id_tipo_elemento);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoElemento not found: id_tipo_elemento=${id_tipo_elemento}`);
        }
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(updated);
    }
    async delete(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoCommandRepository.delete()", {
            id_tipo_elemento,
        });
        await Models.TipoElementoModel.destroy({ where: { id_tipo_elemento } });
    }
}
exports.TipoElementoCommandRepository = TipoElementoCommandRepository;
