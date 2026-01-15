"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanRepository = void 0;
const Models_1 = require("../Models");
class PlanRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async exists(id_plan) {
        this.logger.info("[Repository] PlanRepository.exists()", { id_plan });
        const plan = await Models_1.PlanModel.findByPk(id_plan);
        return Boolean(plan);
    }
}
exports.PlanRepository = PlanRepository;
