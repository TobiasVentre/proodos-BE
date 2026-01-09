"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componenteSchemas = void 0;
exports.componenteSchemas = {
    CreateComponenteDTO: {
        type: "object",
        required: [
            "id_tipo_componente",
            "id_plan",
            "id_tipo_variacion",
            "nombre"
        ],
        properties: {
            id_tipo_componente: { type: "integer", example: 1 },
            id_plan: { type: "integer", example: 2 },
            id_tipo_variacion: { type: "integer", example: 3 },
            nombre: { type: "string", example: "Banner principal" }
        }
    }
};
