"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanQueryRepository = void 0;
const Models = require("../../Models");
const PlanMapper_1 = require("../../../Mappers/PlanMapper");
class PlanQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_plan) {
        this.logger.info("[Repository] PlanQueryRepository.getById(id)");
        const row = await Models.PlanModel.findByPk(id_plan);
        return row ? PlanMapper_1.PlanMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] PlanQueryRepository.getAll()");
        const rows = await Models.PlanModel.findAll({
            order: [["id_plan", "DESC"]],
        });
        return rows.map((row) => PlanMapper_1.PlanMapper.toDomain(row));
    }
    async exists(id_plan) {
        this.logger.info("[Repository] PlanQueryRepository.exists()");
        const count = await Models.PlanModel.count({ where: { id_plan } });
        return count > 0;
    }
}
exports.PlanQueryRepository = PlanQueryRepository;
