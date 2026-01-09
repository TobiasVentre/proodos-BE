"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteMapper = void 0;
class LandingComponenteMapper {
    static toDomain(model) {
        return {
            id_landing: model.id_landing,
            id_componente: model.id_componente,
        };
    }
    static toPersistence(entity) {
        return {
            id_landing: entity.id_landing,
            id_componente: entity.id_componente,
        };
    }
}
exports.LandingComponenteMapper = LandingComponenteMapper;
