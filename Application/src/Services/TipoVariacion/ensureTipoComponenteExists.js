"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTipoComponenteExists = void 0;
const NotFoundError_1 = require("../../Errors/NotFoundError");
const ensureTipoComponenteExists = async (tipoComponenteRepository, id_tipo_componente) => {
    const exists = await tipoComponenteRepository.exists(id_tipo_componente);
    if (!exists) {
        throw new NotFoundError_1.NotFoundError("Tipo componente not found");
    }
};
exports.ensureTipoComponenteExists = ensureTipoComponenteExists;
