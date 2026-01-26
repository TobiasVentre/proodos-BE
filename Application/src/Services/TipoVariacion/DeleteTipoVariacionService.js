"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTipoVariacionService = void 0;
class DeleteTipoVariacionService {
    constructor(tipoVariacionRepository) {
        this.tipoVariacionRepository = tipoVariacionRepository;
    }
    async execute(id_tipo_variacion) {
        await this.tipoVariacionRepository.delete(id_tipo_variacion);
    }
}
exports.DeleteTipoVariacionService = DeleteTipoVariacionService;
