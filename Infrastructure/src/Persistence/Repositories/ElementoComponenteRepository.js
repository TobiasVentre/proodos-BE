"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementoComponenteRepository = void 0;
const ElementoComponenteCommandRepository_1 = require("./Commands/ElementoComponenteCommandRepository");
const ElementoComponenteQueryRepository_1 = require("./Queries/ElementoComponenteQueryRepository");
class ElementoComponenteRepository {
    constructor(logger) {
        this.commandRepository = new ElementoComponenteCommandRepository_1.ElementoComponenteCommandRepository(logger);
        this.queryRepository = new ElementoComponenteQueryRepository_1.ElementoComponenteQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_elemento, dto) {
        return this.commandRepository.patch(id_elemento, dto);
    }
    async getById(id_elemento) {
        return this.queryRepository.getById(id_elemento);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async getByComponente(id_componente) {
        return this.queryRepository.getByComponente(id_componente);
    }
    async delete(id_elemento) {
        return this.commandRepository.delete(id_elemento);
    }
}
exports.ElementoComponenteRepository = ElementoComponenteRepository;
