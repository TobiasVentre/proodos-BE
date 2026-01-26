"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTipoComponenteService = void 0;
class DeleteTipoComponenteService {
    constructor(tipoComponenteRepository) {
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    async execute(id_tipo_componente) {
        await this.tipoComponenteRepository.delete(id_tipo_componente);
    }
}
exports.DeleteTipoComponenteService = DeleteTipoComponenteService;
