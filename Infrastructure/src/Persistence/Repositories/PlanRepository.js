"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanRepository = void 0;
const PlanCommandRepository_1 = require("./Commands/PlanCommandRepository");
const PlanQueryRepository_1 = require("./Queries/PlanQueryRepository");
class PlanRepository {
    constructor(logger) {
        this.commandRepository = new PlanCommandRepository_1.PlanCommandRepository(logger);
        this.queryRepository = new PlanQueryRepository_1.PlanQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_plan, dto) {
        return this.commandRepository.patch(id_plan, dto);
    }
    async patchFull(id_plan, dto) {
        return this.commandRepository.patchFull(id_plan, dto);
    }
    async getById(id_plan) {
        return this.queryRepository.getById(id_plan);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async exists(id_plan) {
        return this.queryRepository.exists(id_plan);
    }
}
exports.PlanRepository = PlanRepository;
