"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignPlanToComponenteService = void 0;
const ensurePlanExists_1 = require("./ensurePlanExists");
class AssignPlanToComponenteService {
    constructor(componenteRepository, planRepository) {
        this.componenteRepository = componenteRepository;
        this.planRepository = planRepository;
    }
    async execute(id_componente, id_plan) {
        await (0, ensurePlanExists_1.ensurePlanExists)(this.planRepository, id_plan);
        return this.componenteRepository.patch(id_componente, { id_plan });
    }
}
exports.AssignPlanToComponenteService = AssignPlanToComponenteService;
