import { Plan } from "@proodos/domain/Entities/Plan";
import { IPlanExportDataDTO } from "./IPlanExportDataDTO";

const normalizeNullableString = (value: string | null | undefined): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized ? normalized : null;
};

export const mapPlanToExportDataDTO = (plan: Plan): IPlanExportDataDTO => ({
  id_plan: plan.id_plan,
  segmento: normalizeNullableString(plan.segmento),
  producto: normalizeNullableString(plan.producto),
  bonete: normalizeNullableString(plan.bonete),
  nombre: normalizeNullableString(plan.nombre),
  nombre_plan: normalizeNullableString(plan.nombre_plan),
  capacidad: plan.capacidad ?? null,
  capacidad_plan: normalizeNullableString(plan.capacidad_plan),
  capacidad_anterior: plan.capacidad_anterior ?? null,
  precio_full_price: plan.precio_full_price ?? null,
  precio_oferta: plan.precio_oferta ?? null,
  tag_1: normalizeNullableString(plan.tag_1),
  tag_2: normalizeNullableString(plan.tag_2),
  beneficio_1: normalizeNullableString(plan.beneficio_1),
  beneficio_2: normalizeNullableString(plan.beneficio_2),
  beneficio_3: normalizeNullableString(plan.beneficio_3),
  beneficio_4: normalizeNullableString(plan.beneficio_4),
  cta_1: normalizeNullableString(plan.cta_1),
  link_1: normalizeNullableString(plan.link_1),
  cta_2: normalizeNullableString(plan.cta_2),
  link_2: normalizeNullableString(plan.link_2),
  aumento: plan.aumento ?? null,
  precio_tv_digital: plan.precio_tv_digital ?? null,
  precio_tv_max: plan.precio_tv_max ?? null,
  promo_activa: plan.promo_activa ?? null,
  muestra_desde: normalizeNullableString(plan.muestra_desde),
  canales_tv_digital: normalizeNullableString(plan.canales_tv_digital),
  canales_tv_max: normalizeNullableString(plan.canales_tv_max),
  precio_no_cliente: plan.precio_no_cliente ?? null,
  descripcion_oferta: normalizeNullableString(plan.descripcion_oferta),
  comercial_name: normalizeNullableString(plan.comercial_name),
  comercial_id: normalizeNullableString(plan.comercial_id),
  telefono_0800: normalizeNullableString(plan.telefono_0800),
  icono_tag_1: normalizeNullableString(plan.icono_tag_1),
  pre_beneficio_2_titulo: normalizeNullableString(plan.pre_beneficio_2_titulo),
  pre_beneficio_2_descripcion: normalizeNullableString(plan.pre_beneficio_2_descripcion),
  pre_beneficio_1_titulo: normalizeNullableString(plan.pre_beneficio_1_titulo),
  pre_beneficio_1_descripcion: normalizeNullableString(plan.pre_beneficio_1_descripcion),
  nombre_plan_tv: normalizeNullableString(plan.nombre_plan_tv),
  grilla_canales: normalizeNullableString(plan.grilla_canales),
  icono_bonete: normalizeNullableString(plan.icono_bonete),
  precio_sin_iva: plan.precio_sin_iva ?? null,
});
