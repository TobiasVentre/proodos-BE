"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageRepository = void 0;
const Models_1 = require("../Models");
const LandingPageMapper_1 = require("../../Mappers/LandingPageMapper");
class LandingPageRepository {
    async create(entity) {
        const created = await Models_1.LandingPageModel.create({
            URL: entity.URL,
            estado: entity.estado,
            segmento: entity.segmento,
        });
        return LandingPageMapper_1.LandingPageMapper.toDomain(created);
    }
    async update(entity) {
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
        await Models_1.LandingPageModel.destroy({ where: { id_landing } });
    }
    async getById(id_landing) {
        const row = await Models_1.LandingPageModel.findByPk(id_landing);
        console.log("[Repository] LandingPageRepository.getById()", { id_landing });
        return row ? LandingPageMapper_1.LandingPageMapper.toDomain(row) : null;
    }
    async getAll() {
        console.log("[Repository] LandingPageRepository.getAll()");
        const rows = await Models_1.LandingPageModel.findAll({
            order: [["id_landing", "DESC"]],
        });
        return rows.map((r) => LandingPageMapper_1.LandingPageMapper.toDomain(r));
    }
}
exports.LandingPageRepository = LandingPageRepository;
