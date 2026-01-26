"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnassignPlanFromComponenteService = void 0;
class UnassignPlanFromComponenteService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(id_componente) {
        return this.componenteRepository.patch(id_componente, { id_plan: null });
    }
}
exports.UnassignPlanFromComponenteService = UnassignPlanFromComponenteService;
