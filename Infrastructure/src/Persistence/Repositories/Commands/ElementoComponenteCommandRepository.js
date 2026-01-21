"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementoComponenteCommandRepository = void 0;
const Models = require("../../Models");
const ElementoComponenteMapper_1 = require("../../../Mappers/ElementoComponenteMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class ElementoComponenteCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] ElementoComponenteCommandRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.ElementoComponenteModel.create({
            id_componente: entity.id_componente,
            id_tipo_elemento: entity.id_tipo_elemento,
            nombre: entity.nombre,
            icono_img: entity.icono_img,
            descripcion: entity.descripcion,
            link: entity.link,
            orden: entity.orden,
            css_url: entity.css_url,
        });
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] ElementoComponenteCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.ElementoComponenteModel.update({
            id_componente: entity.id_componente,
            id_tipo_elemento: entity.id_tipo_elemento,
            nombre: entity.nombre,
            icono_img: entity.icono_img,
            descripcion: entity.descripcion,
            link: entity.link,
            orden: entity.orden,
            css_url: entity.css_url,
        }, { where: { id_elemento: entity.id_elemento } });
        const updated = await Models.ElementoComponenteModel.findByPk(entity.id_elemento);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`ElementoComponente not found: id_elemento=${entity.id_elemento}`);
        }
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(updated);
    }
    async patch(id_elemento, dto) {
        this.logger.info("[Repository] ElementoComponenteCommandRepository.patch()", {
            id_elemento,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.id_componente !== undefined) {
            updatePayload.id_componente = dto.id_componente;
        }
        if (dto.id_tipo_elemento !== undefined) {
            updatePayload.id_tipo_elemento = dto.id_tipo_elemento;
        }
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.icono_img !== undefined)
            updatePayload.icono_img = dto.icono_img;
        if (dto.descripcion !== undefined)
            updatePayload.descripcion = dto.descripcion;
        if (dto.link !== undefined)
            updatePayload.link = dto.link;
        if (dto.orden !== undefined)
            updatePayload.orden = dto.orden;
        if (dto.css_url !== undefined)
            updatePayload.css_url = dto.css_url;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.ElementoComponenteModel.update(updatePayload, {
            where: { id_elemento },
        });
        const updated = await Models.ElementoComponenteModel.findByPk(id_elemento);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`ElementoComponente not found: id_elemento=${id_elemento}`);
        }
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(updated);
    }
    async delete(id_elemento) {
        this.logger.info("[Repository] ElementoComponenteCommandRepository.delete()", {
            id_elemento,
        });
        await Models.ElementoComponenteModel.destroy({ where: { id_elemento } });
    }
}
exports.ElementoComponenteCommandRepository = ElementoComponenteCommandRepository;
