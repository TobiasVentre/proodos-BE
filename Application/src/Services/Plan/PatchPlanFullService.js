"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchPlanFullService = void 0;
class PatchPlanFullService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(id_plan, dto) {
        this.logger.info("[Service] PatchPlanFullService.execute()", { id_plan });
        return await this.planRepository.patchFull(id_plan, dto);
    }
}
exports.PatchPlanFullService = PatchPlanFullService;
