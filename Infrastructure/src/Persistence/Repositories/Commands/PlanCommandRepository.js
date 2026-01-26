"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanCommandRepository = void 0;
const Models = require("../../Models");
const PlanMapper_1 = require("../../../Mappers/PlanMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
const ValidationError_1 = require("@proodos/application/Errors/ValidationError");
class PlanCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] PlanCommandRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.PlanModel.create({
            segmento: entity.segmento,
            producto: entity.producto,
            bonete: entity.bonete,
            nombre: entity.nombre,
            nombre_plan: entity.nombre_plan,
            capacidad: entity.capacidad,
            capacidad_plan: entity.capacidad_plan,
            capacidad_anterior: entity.capacidad_anterior,
            precio_full_price: entity.precio_full_price,
            precio_oferta: entity.precio_oferta,
            tag_1: entity.tag_1,
            tag_2: entity.tag_2,
            beneficio_1: entity.beneficio_1,
            beneficio_2: entity.beneficio_2,
            beneficio_3: entity.beneficio_3,
            beneficio_4: entity.beneficio_4,
            cta_1: entity.cta_1,
            link_1: entity.link_1,
            cta_2: entity.cta_2,
            link_2: entity.link_2,
            aumento: entity.aumento,
            precio_tv_digital: entity.precio_tv_digital,
            precio_tv_max: entity.precio_tv_max,
            promo_activa: entity.promo_activa,
            muestra_desde: entity.muestra_desde,
            canales_tv_digital: entity.canales_tv_digital,
            canales_tv_max: entity.canales_tv_max,
            precio_no_cliente: entity.precio_no_cliente,
            descripcion_oferta: entity.descripcion_oferta,
            comercial_name: entity.comercial_name,
            comercial_id: entity.comercial_id,
            telefono_0800: entity.telefono_0800,
            icono_tag_1: entity.icono_tag_1,
            pre_beneficio_2_titulo: entity.pre_beneficio_2_titulo,
            pre_beneficio_2_descripcion: entity.pre_beneficio_2_descripcion,
            pre_beneficio_1_titulo: entity.pre_beneficio_1_titulo,
            pre_beneficio_1_descripcion: entity.pre_beneficio_1_descripcion,
            nombre_plan_tv: entity.nombre_plan_tv,
            grilla_canales: entity.grilla_canales,
            icono_bonete: entity.icono_bonete,
            precio_sin_iva: entity.precio_sin_iva,
        });
        return PlanMapper_1.PlanMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] PlanCommandRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.PlanModel.update({
            nombre: entity.nombre,
            capacidad: entity.capacidad,
            capacidad_anterior: entity.capacidad_anterior,
            precio_full_price: entity.precio_full_price,
            precio_oferta: entity.precio_oferta,
            aumento: entity.aumento,
            precio_sin_iva: entity.precio_sin_iva,
        }, { where: { id_plan: entity.id_plan } });
        const updated = await Models.PlanModel.findByPk(entity.id_plan);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`Plan not found: id_plan=${entity.id_plan}`);
        }
        return PlanMapper_1.PlanMapper.toDomain(updated);
    }
    async patch(id_plan, dto) {
        this.logger.info("[Repository] PlanCommandRepository.patch()", { id_plan });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.capacidad !== undefined)
            updatePayload.capacidad = dto.capacidad;
        if (dto.capacidad_anterior !== undefined) {
            updatePayload.capacidad_anterior = dto.capacidad_anterior;
        }
        if (dto.precio_full_price !== undefined) {
            updatePayload.precio_full_price = dto.precio_full_price;
        }
        if (dto.precio_oferta !== undefined) {
            updatePayload.precio_oferta = dto.precio_oferta;
        }
        if (dto.aumento !== undefined)
            updatePayload.aumento = dto.aumento;
        if (dto.precio_sin_iva !== undefined) {
            updatePayload.precio_sin_iva = dto.precio_sin_iva;
        }
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.PlanModel.update(updatePayload, {
            where: { id_plan },
        });
        const updated = await Models.PlanModel.findByPk(id_plan);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`Plan not found: id_plan=${id_plan}`);
        }
        return PlanMapper_1.PlanMapper.toDomain(updated);
    }
    async patchFull(id_plan, dto) {
        this.logger.info("[Repository] PlanCommandRepository.patchFull()", { id_plan });
        this.logger.debug("[Repository] Patch Full DTO:", dto);
        const updatePayload = {};
        if (dto.segmento !== undefined)
            updatePayload.segmento = dto.segmento;
        if (dto.producto !== undefined)
            updatePayload.producto = dto.producto;
        if (dto.bonete !== undefined)
            updatePayload.bonete = dto.bonete;
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.nombre_plan !== undefined)
            updatePayload.nombre_plan = dto.nombre_plan;
        if (dto.capacidad !== undefined)
            updatePayload.capacidad = dto.capacidad;
        if (dto.capacidad_plan !== undefined) {
            updatePayload.capacidad_plan = dto.capacidad_plan;
        }
        if (dto.capacidad_anterior !== undefined) {
            updatePayload.capacidad_anterior = dto.capacidad_anterior;
        }
        if (dto.precio_full_price !== undefined) {
            updatePayload.precio_full_price = dto.precio_full_price;
        }
        if (dto.precio_oferta !== undefined) {
            updatePayload.precio_oferta = dto.precio_oferta;
        }
        if (dto.tag_1 !== undefined)
            updatePayload.tag_1 = dto.tag_1;
        if (dto.tag_2 !== undefined)
            updatePayload.tag_2 = dto.tag_2;
        if (dto.beneficio_1 !== undefined)
            updatePayload.beneficio_1 = dto.beneficio_1;
        if (dto.beneficio_2 !== undefined)
            updatePayload.beneficio_2 = dto.beneficio_2;
        if (dto.beneficio_3 !== undefined)
            updatePayload.beneficio_3 = dto.beneficio_3;
        if (dto.beneficio_4 !== undefined)
            updatePayload.beneficio_4 = dto.beneficio_4;
        if (dto.cta_1 !== undefined)
            updatePayload.cta_1 = dto.cta_1;
        if (dto.link_1 !== undefined)
            updatePayload.link_1 = dto.link_1;
        if (dto.cta_2 !== undefined)
            updatePayload.cta_2 = dto.cta_2;
        if (dto.link_2 !== undefined)
            updatePayload.link_2 = dto.link_2;
        if (dto.aumento !== undefined)
            updatePayload.aumento = dto.aumento;
        if (dto.precio_tv_digital !== undefined) {
            updatePayload.precio_tv_digital = dto.precio_tv_digital;
        }
        if (dto.precio_tv_max !== undefined) {
            updatePayload.precio_tv_max = dto.precio_tv_max;
        }
        if (dto.promo_activa !== undefined)
            updatePayload.promo_activa = dto.promo_activa;
        if (dto.muestra_desde !== undefined)
            updatePayload.muestra_desde = dto.muestra_desde;
        if (dto.canales_tv_digital !== undefined) {
            updatePayload.canales_tv_digital = dto.canales_tv_digital;
        }
        if (dto.canales_tv_max !== undefined) {
            updatePayload.canales_tv_max = dto.canales_tv_max;
        }
        if (dto.precio_no_cliente !== undefined) {
            updatePayload.precio_no_cliente = dto.precio_no_cliente;
        }
        if (dto.descripcion_oferta !== undefined) {
            updatePayload.descripcion_oferta = dto.descripcion_oferta;
        }
        if (dto.comercial_name !== undefined) {
            updatePayload.comercial_name = dto.comercial_name;
        }
        if (dto.comercial_id !== undefined)
            updatePayload.comercial_id = dto.comercial_id;
        if (dto.telefono_0800 !== undefined)
            updatePayload.telefono_0800 = dto.telefono_0800;
        if (dto.icono_tag_1 !== undefined)
            updatePayload.icono_tag_1 = dto.icono_tag_1;
        if (dto.pre_beneficio_2_titulo !== undefined) {
            updatePayload.pre_beneficio_2_titulo = dto.pre_beneficio_2_titulo;
        }
        if (dto.pre_beneficio_2_descripcion !== undefined) {
            updatePayload.pre_beneficio_2_descripcion = dto.pre_beneficio_2_descripcion;
        }
        if (dto.pre_beneficio_1_titulo !== undefined) {
            updatePayload.pre_beneficio_1_titulo = dto.pre_beneficio_1_titulo;
        }
        if (dto.pre_beneficio_1_descripcion !== undefined) {
            updatePayload.pre_beneficio_1_descripcion = dto.pre_beneficio_1_descripcion;
        }
        if (dto.nombre_plan_tv !== undefined)
            updatePayload.nombre_plan_tv = dto.nombre_plan_tv;
        if (dto.grilla_canales !== undefined)
            updatePayload.grilla_canales = dto.grilla_canales;
        if (dto.icono_bonete !== undefined)
            updatePayload.icono_bonete = dto.icono_bonete;
        if (dto.precio_sin_iva !== undefined)
            updatePayload.precio_sin_iva = dto.precio_sin_iva;
        if (Object.keys(updatePayload).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided for patch");
        }
        await Models.PlanModel.update(updatePayload, {
            where: { id_plan },
        });
        const updated = await Models.PlanModel.findByPk(id_plan);
        if (!updated) {
            throw new NotFoundError_1.NotFoundError(`Plan not found: id_plan=${id_plan}`);
        }
        return PlanMapper_1.PlanMapper.toDomain(updated);
    }
}
exports.PlanCommandRepository = PlanCommandRepository;
