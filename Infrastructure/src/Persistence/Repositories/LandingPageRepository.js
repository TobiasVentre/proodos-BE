"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageRepository = void 0;
const LandingPageCommandRepository_1 = require("./Commands/LandingPageCommandRepository");
const LandingPageQueryRepository_1 = require("./Queries/LandingPageQueryRepository");
class LandingPageRepository {
    constructor(logger) {
        this.commandRepository = new LandingPageCommandRepository_1.LandingPageCommandRepository(logger);
        this.queryRepository = new LandingPageQueryRepository_1.LandingPageQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async delete(id_landing) {
        return this.commandRepository.delete(id_landing);
    }
    async getById(id_landing) {
        return this.queryRepository.getById(id_landing);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
}
exports.LandingPageRepository = LandingPageRepository;
