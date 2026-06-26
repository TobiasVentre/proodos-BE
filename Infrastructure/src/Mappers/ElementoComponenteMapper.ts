import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteModel } from "../Persistence/Models/ElementoComponenteModel";

const parseJsonObject = (
  value: string | Record<string, unknown> | null | undefined
): Record<string, unknown> | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "object" && !Array.isArray(value)) return value;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
};

export class ElementoComponenteMapper {
  static toDomain(model: ElementoComponenteModel): ElementoComponente {
    return {
      id_elemento: model.id_elemento,
      id_tipo_elemento: model.id_tipo_elemento,
      nombre: model.nombre,
      selector: model.selector ?? null,
      icono_img: model.icono_img ?? null,
      descripcion: model.descripcion ?? null,
      link: model.link ?? null,
      orden: model.orden,
      css_url: model.css_url ?? null,
      js_url: model.js_url ?? null,
      contrato_minimo: parseJsonObject(model.contrato_minimo),
    };
  }
}
