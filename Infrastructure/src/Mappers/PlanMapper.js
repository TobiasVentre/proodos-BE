"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanMapper = void 0;
class PlanMapper {
    static toDomain(model) {
        return {
            id_plan: model.id_plan,
            segmento: model.segmento ?? null,
            producto: model.producto ?? null,
            bonete: model.bonete ?? null,
            nombre: model.nombre ?? null,
            nombre_plan: model.nombre_plan ?? null,
            capacidad: model.capacidad === null ? null : Number(model.capacidad),
            capacidad_plan: model.capacidad_plan ?? null,
            capacidad_anterior: model.capacidad_anterior === null ? null : Number(model.capacidad_anterior),
            precio_full_price: model.precio_full_price === null ? null : Number(model.precio_full_price),
            precio_oferta: model.precio_oferta === null ? null : Number(model.precio_oferta),
            tag_1: model.tag_1 ?? null,
            tag_2: model.tag_2 ?? null,
            beneficio_1: model.beneficio_1 ?? null,
            beneficio_2: model.beneficio_2 ?? null,
            beneficio_3: model.beneficio_3 ?? null,
            beneficio_4: model.beneficio_4 ?? null,
            cta_1: model.cta_1 ?? null,
            link_1: model.link_1 ?? null,
            cta_2: model.cta_2 ?? null,
            link_2: model.link_2 ?? null,
            aumento: model.aumento === null ? null : Number(model.aumento),
            precio_tv_digital: model.precio_tv_digital === null ? null : Number(model.precio_tv_digital),
            precio_tv_max: model.precio_tv_max === null ? null : Number(model.precio_tv_max),
            promo_activa: model.promo_activa ?? null,
            muestra_desde: model.muestra_desde ?? null,
            canales_tv_digital: model.canales_tv_digital ?? null,
            canales_tv_max: model.canales_tv_max ?? null,
            precio_no_cliente: model.precio_no_cliente === null ? null : Number(model.precio_no_cliente),
            descripcion_oferta: model.descripcion_oferta ?? null,
            comercial_name: model.comercial_name ?? null,
            comercial_id: model.comercial_id ?? null,
            telefono_0800: model.telefono_0800 ?? null,
            icono_tag_1: model.icono_tag_1 ?? null,
            pre_beneficio_2_titulo: model.pre_beneficio_2_titulo ?? null,
            pre_beneficio_2_descripcion: model.pre_beneficio_2_descripcion ?? null,
            pre_beneficio_1_titulo: model.pre_beneficio_1_titulo ?? null,
            pre_beneficio_1_descripcion: model.pre_beneficio_1_descripcion ?? null,
            nombre_plan_tv: model.nombre_plan_tv ?? null,
            grilla_canales: model.grilla_canales ?? null,
            icono_bonete: model.icono_bonete ?? null,
            precio_sin_iva: model.precio_sin_iva === null ? null : Number(model.precio_sin_iva),
        };
    }
}
exports.PlanMapper = PlanMapper;
