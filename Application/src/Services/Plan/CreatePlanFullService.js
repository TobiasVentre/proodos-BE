"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlanFullService = void 0;
const PlanDTOMapper_1 = require("../../DTOs/Plan/PlanDTOMapper");
class CreatePlanFullService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreatePlanFullService.execute()");
        const plan = (0, PlanDTOMapper_1.mapCreatePlanFullDTOToEntity)(dto);
        return await this.planRepository.create(plan);
    }
}
exports.CreatePlanFullService = CreatePlanFullService;
