"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComponenteRepository = void 0;
const TipoComponenteCommandRepository_1 = require("./Commands/TipoComponenteCommandRepository");
const TipoComponenteQueryRepository_1 = require("./Queries/TipoComponenteQueryRepository");
class TipoComponenteRepository {
    constructor(logger) {
        this.commandRepository = new TipoComponenteCommandRepository_1.TipoComponenteCommandRepository(logger);
        this.queryRepository = new TipoComponenteQueryRepository_1.TipoComponenteQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_tipo_componente, dto) {
        return this.commandRepository.patch(id_tipo_componente, dto);
    }
    async getById(id_tipo_componente) {
        return this.queryRepository.getById(id_tipo_componente);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async exists(id_tipo_componente) {
        return this.queryRepository.exists(id_tipo_componente);
    }
}
exports.TipoComponenteRepository = TipoComponenteRepository;
