import { Componente } from "@proodos/domain/Entities/Componente";
import { ComponenteModel } from "../Persistence/Models/ComponenteModel";

export class ComponenteMapper {
  static toDomain(model: ComponenteModel): Componente {
    const plan = (model as ComponenteModel & { plan?: { toJSON?: () => unknown } }).plan;

    return {
      id_componente: model.id_componente,
      id_tipo_componente: model.id_tipo_componente,
      id_plan: model.id_plan,
      id_tipo_variacion: model.id_tipo_variacion,
      nombre: model.nombre,
      fecha_creacion: model.fecha_creacion,
      plan: plan ? (typeof plan.toJSON === "function" ? plan.toJSON() : plan) : undefined,
    };
  }
}
