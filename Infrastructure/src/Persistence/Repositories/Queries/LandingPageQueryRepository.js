"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageQueryRepository = void 0;
const Models_1 = require("../../Models");
const LandingPageMapper_1 = require("../../../Mappers/LandingPageMapper");
class LandingPageQueryRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async getById(id_landing) {
        this.logger.info("[Repository] LandingPageQueryRepository.getById()", { id_landing });
        const row = await Models_1.LandingPageModel.findByPk(id_landing);
        return row ? LandingPageMapper_1.LandingPageMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] LandingPageQueryRepository.getAll()");
        const rows = await Models_1.LandingPageModel.findAll({
            order: [["id_landing", "DESC"]],
        });
        return rows.map((r) => LandingPageMapper_1.LandingPageMapper.toDomain(r));
    }
}
exports.LandingPageQueryRepository = LandingPageQueryRepository;
