"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVariacionRepository = void 0;
const TipoVariacionCommandRepository_1 = require("./Commands/TipoVariacionCommandRepository");
const TipoVariacionQueryRepository_1 = require("./Queries/TipoVariacionQueryRepository");
class TipoVariacionRepository {
    constructor(logger) {
        this.commandRepository = new TipoVariacionCommandRepository_1.TipoVariacionCommandRepository(logger);
        this.queryRepository = new TipoVariacionQueryRepository_1.TipoVariacionQueryRepository(logger);
    }
    async create(entity) {
        return this.commandRepository.create(entity);
    }
    async update(entity) {
        return this.commandRepository.update(entity);
    }
    async patch(id_tipo_variacion, dto) {
        return this.commandRepository.patch(id_tipo_variacion, dto);
    }
    async getById(id_tipo_variacion) {
        return this.queryRepository.getById(id_tipo_variacion);
    }
    async getAll() {
        return this.queryRepository.getAll();
    }
    async getByTipoComponente(id_tipo_componente) {
        return this.queryRepository.getByTipoComponente(id_tipo_componente);
    }
}
exports.TipoVariacionRepository = TipoVariacionRepository;
