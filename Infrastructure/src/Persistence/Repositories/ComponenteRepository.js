"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteRepository = void 0;
const ComponenteCommandRepository_1 = require("./Commands/ComponenteCommandRepository");
const ComponenteQueryRepository_1 = require("./Queries/ComponenteQueryRepository");
class ComponenteRepository {
    constructor(logger) {
        this.commandRepository = new ComponenteCommandRepository_1.ComponenteCommandRepository(logger);
        this.queryRepository = new ComponenteQueryRepository_1.ComponenteQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_componente, dto) {
        return this.commandRepository.patch(id_componente, dto);
    }
    async delete(id_componente) {
        return this.commandRepository.delete(id_componente);
    }
    async softDelete(id_componente, fecha_baja, estado) {
        return this.commandRepository.softDelete(id_componente, fecha_baja, estado);
    }
    async getById(id) {
        return this.queryRepository.getById(id);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async getByPlan(id_plan) {
        return this.queryRepository.getByPlan(id_plan);
    }
}
exports.ComponenteRepository = ComponenteRepository;
