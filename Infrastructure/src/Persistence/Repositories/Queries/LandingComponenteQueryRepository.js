"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteQueryRepository = void 0;
const Models_1 = require("../../Models");
const LandingComponenteMapper_1 = require("../../../Mappers/LandingComponenteMapper");
class LandingComponenteQueryRepository {
    async getByLanding(id_landing) {
        const rows = await Models_1.LandingComponenteModel.findAll({
            where: { id_landing },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        return rows.map((r) => LandingComponenteMapper_1.LandingComponenteMapper.toDomain(r));
    }
    async getByComponente(id_componente) {
        const rows = await Models_1.LandingComponenteModel.findAll({
            where: { id_componente },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        return rows.map((r) => LandingComponenteMapper_1.LandingComponenteMapper.toDomain(r));
    }
    async exists(id_landing, id_componente) {
        const row = await Models_1.LandingComponenteModel.findOne({
            where: { id_landing, id_componente },
        });
        return row !== null;
    }
    async existsByComponente(id_componente) {
        const row = await Models_1.LandingComponenteModel.findOne({
            where: { id_componente },
        });
        return row !== null;
    }
}
exports.LandingComponenteQueryRepository = LandingComponenteQueryRepository;
