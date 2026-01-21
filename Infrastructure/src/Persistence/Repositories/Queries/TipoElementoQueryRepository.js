"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoElementoQueryRepository = void 0;
const Models = require("../../Models");
const TipoElementoMapper_1 = require("../../../Mappers/TipoElementoMapper");
class TipoElementoQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoQueryRepository.getById()");
        const row = await Models.TipoElementoModel.findByPk(id_tipo_elemento);
        return row ? TipoElementoMapper_1.TipoElementoMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoElementoQueryRepository.getAll()");
        const rows = await Models.TipoElementoModel.findAll({
            order: [["id_tipo_elemento", "DESC"]],
        });
        return rows.map((row) => TipoElementoMapper_1.TipoElementoMapper.toDomain(row));
    }
    async exists(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoQueryRepository.exists()");
        const count = await Models.TipoElementoModel.count({
            where: { id_tipo_elemento },
        });
        return count > 0;
    }
}
exports.TipoElementoQueryRepository = TipoElementoQueryRepository;
