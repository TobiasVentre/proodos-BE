"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComponenteService = void 0;
const ConflictError_1 = require("../../Errors/ConflictError");
const NotFoundError_1 = require("../../Errors/NotFoundError");
class DeleteComponenteService {
    constructor(componenteRepository, landingComponenteRepository) {
        this.componenteRepository = componenteRepository;
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_componente) {
        const componente = await this.componenteRepository.getById(id_componente);
        if (!componente) {
            throw new NotFoundError_1.NotFoundError("Componente not found");
        }
        const isAssigned = await this.landingComponenteRepository.existsByComponente(id_componente);
        if (isAssigned) {
            throw new ConflictError_1.ConflictError("Componente is assigned to a landing");
        }
        await this.componenteRepository.delete(id_componente);
    }
}
exports.DeleteComponenteService = DeleteComponenteService;
