import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { ElementoComponenteVariacionModel } from "../Persistence/Models/ElementoComponenteVariacionModel";

const parseMetadata = (metadata: string | null | undefined): Record<string, unknown> => {
  if (!metadata) return {};
  try {
    const parsed = JSON.parse(metadata);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
};

export class ElementoComponenteVariacionMapper {
  static toDomain(
    model: ElementoComponenteVariacionModel
  ): ElementoComponenteVariacion {
    return {
      id_elemento_componente_variacion: model.id_elemento_componente_variacion,
      id_elemento: model.id_elemento,
      id_tipo_variacion: model.id_tipo_variacion,
      id_componente: model.id_componente ?? null,
      metadata: parseMetadata(model.metadata),
    };
  }
}
