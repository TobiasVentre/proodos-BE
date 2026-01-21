"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementoComponenteQueryRepository = void 0;
const Models = require("../../Models");
const ElementoComponenteMapper_1 = require("../../../Mappers/ElementoComponenteMapper");
class ElementoComponenteQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_elemento) {
        this.logger.info("[Repository] ElementoComponenteQueryRepository.getById()");
        const row = await Models.ElementoComponenteModel.findByPk(id_elemento);
        return row ? ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] ElementoComponenteQueryRepository.getAll()");
        const rows = await Models.ElementoComponenteModel.findAll({
            order: [["id_elemento", "DESC"]],
        });
        return rows.map((row) => ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row));
    }
    async getByComponente(id_componente) {
        this.logger.info("[Repository] ElementoComponenteQueryRepository.getByComponente()", {
            id_componente,
        });
        const rows = await Models.ElementoComponenteModel.findAll({
            where: { id_componente },
            order: [["orden", "ASC"]],
        });
        return rows.map((row) => ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row));
    }
}
exports.ElementoComponenteQueryRepository = ElementoComponenteQueryRepository;
