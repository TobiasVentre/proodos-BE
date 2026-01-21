"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoElementoRepository = void 0;
const TipoElementoCommandRepository_1 = require("./Commands/TipoElementoCommandRepository");
const TipoElementoQueryRepository_1 = require("./Queries/TipoElementoQueryRepository");
class TipoElementoRepository {
    constructor(logger) {
        this.commandRepository = new TipoElementoCommandRepository_1.TipoElementoCommandRepository(logger);
        this.queryRepository = new TipoElementoQueryRepository_1.TipoElementoQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_tipo_elemento, dto) {
        return this.commandRepository.patch(id_tipo_elemento, dto);
    }
    async getById(id_tipo_elemento) {
        return this.queryRepository.getById(id_tipo_elemento);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async delete(id_tipo_elemento) {
        return this.commandRepository.delete(id_tipo_elemento);
    }
    async exists(id_tipo_elemento) {
        return this.queryRepository.exists(id_tipo_elemento);
    }
}
exports.TipoElementoRepository = TipoElementoRepository;
