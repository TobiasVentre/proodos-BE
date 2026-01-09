"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteMapper = void 0;
class ComponenteMapper {
    static toDomain(model) {
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
exports.ComponenteMapper = ComponenteMapper;
