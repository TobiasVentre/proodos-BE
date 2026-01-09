"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComponenteService = void 0;
class DeleteComponenteService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(id_componente) {
        await this.componenteRepository.delete(id_componente);
    }
}
exports.DeleteComponenteService = DeleteComponenteService;
