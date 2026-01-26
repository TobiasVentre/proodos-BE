"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePlanService = void 0;
class DeletePlanService {
    constructor(planRepository) {
        this.planRepository = planRepository;
    }
    async execute(id_plan) {
        await this.planRepository.delete(id_plan);
    }
}
exports.DeletePlanService = DeletePlanService;
