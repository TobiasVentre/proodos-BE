"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageCommandRepository = void 0;
const Models_1 = require("../../Models");
const LandingPageMapper_1 = require("../../../Mappers/LandingPageMapper");
class LandingPageCommandRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] LandingPageCommandRepository.create()");
        const created = await Models_1.LandingPageModel.create({
            URL: entity.URL,
            estado: entity.estado,
            segmento: entity.segmento,
        });
        return LandingPageMapper_1.LandingPageMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] LandingPageCommandRepository.update()", {
            id_landing: entity.id_landing,
        });
        await Models_1.LandingPageModel.update({
            URL: entity.URL,
            estado: entity.estado,
            segmento: entity.segmento,
        }, {
            where: { id_landing: entity.id_landing },
        });
        const updated = await Models_1.LandingPageModel.findByPk(entity.id_landing);
        return updated ? LandingPageMapper_1.LandingPageMapper.toDomain(updated) : null;
    }
    async delete(id_landing) {
        this.logger.info("[Repository] LandingPageCommandRepository.delete()", { id_landing });
        await Models_1.LandingPageModel.destroy({ where: { id_landing } });
    }
}
exports.LandingPageCommandRepository = LandingPageCommandRepository;
