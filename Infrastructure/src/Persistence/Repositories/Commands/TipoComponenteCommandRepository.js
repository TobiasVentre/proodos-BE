"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComponenteCommandRepository = void 0;
const Models = require("../../Models");
const TipoComponenteMapper_1 = require("../../../Mappers/TipoComponenteMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class TipoComponenteCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] TipoComponenteCommandRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.TipoComponenteModel.create({
            nombre: entity.nombre,
            estado: entity.estado,
        });
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoComponenteCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoComponenteModel.update({
            nombre: entity.nombre,
            estado: entity.estado,
        }, { where: { id_tipo_componente: entity.id_tipo_componente } });
        const updated = await Models.TipoComponenteModel.findByPk(entity.id_tipo_componente);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoComponente not found: id_tipo_componente=${entity.id_tipo_componente}`);
        }
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(updated);
    }
    async patch(id_tipo_componente, dto) {
        this.logger.info("[Repository] TipoComponenteCommandRepository.patch()", {
            id_tipo_componente,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.estado !== undefined)
            updatePayload.estado = dto.estado;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.TipoComponenteModel.update(updatePayload, {
            where: { id_tipo_componente },
        });
        const updated = await Models.TipoComponenteModel.findByPk(id_tipo_componente);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`TipoComponente not found: id_tipo_componente=${id_tipo_componente}`);
        }
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(updated);
    }
}
exports.TipoComponenteCommandRepository = TipoComponenteCommandRepository;
