import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteModel } from "../Persistence/Models/ElementoComponenteModel";

export class ElementoComponenteMapper {
  static toDomain(model: ElementoComponenteModel): ElementoComponente {
    return {
      id_elemento: model.id_elemento,
      id_componente: model.id_componente,
      id_tipo_elemento: model.id_tipo_elemento,
      nombre: model.nombre,
      selector: model.selector ?? null,
      icono_img: model.icono_img ?? null,
      descripcion: model.descripcion ?? null,
      link: model.link ?? null,
      orden: model.orden,
      css_url: model.css_url ?? null,
      js_url: model.js_url ?? null,
    };
  }
}
