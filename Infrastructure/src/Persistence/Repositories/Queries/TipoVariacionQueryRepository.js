"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVariacionQueryRepository = void 0;
const Models = require("../../Models");
const TipoVariacionMapper_1 = require("../../../Mappers/TipoVariacionMapper");
class TipoVariacionQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_tipo_variacion) {
        this.logger.info("[Repository] TipoVariacionQueryRepository.getById()");
        const row = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);
        return row ? TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoVariacionQueryRepository.getAll()");
        const rows = await Models.TipoVariacionModel.findAll({
            order: [["id_tipo_variacion", "DESC"]],
        });
        return rows.map((row) => TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row));
    }
    async getByTipoComponente(id_tipo_componente) {
        this.logger.info("[Repository] TipoVariacionQueryRepository.getByTipoComponente()", {
            id_tipo_componente,
        });
        const rows = await Models.TipoVariacionModel.findAll({
            where: { id_tipo_componente },
            order: [["id_tipo_variacion", "DESC"]],
        });
        return rows.map((row) => TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row));
    }
}
exports.TipoVariacionQueryRepository = TipoVariacionQueryRepository;
