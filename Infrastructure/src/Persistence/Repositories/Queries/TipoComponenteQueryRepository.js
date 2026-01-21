"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComponenteQueryRepository = void 0;
const Models = require("../../Models");
const TipoComponenteMapper_1 = require("../../../Mappers/TipoComponenteMapper");
class TipoComponenteQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_tipo_componente) {
        this.logger.info("[Repository] TipoComponenteQueryRepository.getById()");
        const row = await Models.TipoComponenteModel.findByPk(id_tipo_componente);
        return row ? TipoComponenteMapper_1.TipoComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoComponenteQueryRepository.getAll()");
        const rows = await Models.TipoComponenteModel.findAll({
            order: [["id_tipo_componente", "DESC"]],
        });
        return rows.map((row) => TipoComponenteMapper_1.TipoComponenteMapper.toDomain(row));
    }
    async exists(id_tipo_componente) {
        this.logger.info("[Repository] TipoComponenteQueryRepository.exists()");
        const count = await Models.TipoComponenteModel.count({
            where: { id_tipo_componente },
        });
        return count > 0;
    }
}
exports.TipoComponenteQueryRepository = TipoComponenteQueryRepository;
