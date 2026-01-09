import { Componente } from "@proodos/domain/Entities/Componente";
import { ComponenteModel } from "../Persistence/Models/ComponenteModel";

export class ComponenteMapper {
  static toDomain(model: ComponenteModel): Componente {
    return {
      id_componente: model.id_componente,
      id_tipo_componente: model.id_tipo_componente,
      id_plan: model.id_plan,
      id_tipo_variacion: model.id_tipo_variacion,
      nombre: model.nombre,
      fecha_creacion: model.fecha_creacion,
    };
  }
}
