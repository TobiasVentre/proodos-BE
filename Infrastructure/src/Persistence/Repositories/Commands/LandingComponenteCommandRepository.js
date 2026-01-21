"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteCommandRepository = void 0;
const Models_1 = require("../../Models");
const LandingComponenteMapper_1 = require("../../../Mappers/LandingComponenteMapper");
const NotFoundError_1 = require("@proodos/application/Errors/NotFoundError");
class LandingComponenteCommandRepository {
    async assign(entity) {
        await Models_1.LandingComponenteModel.create({
            id_landing: entity.id_landing,
            id_componente: entity.id_componente,
        });
        const created = await Models_1.LandingComponenteModel.findOne({
            where: { id_landing: entity.id_landing, id_componente: entity.id_componente },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        if (!created) {
            throw new NotFoundError_1.NotFoundError("Landing componente not found");
        }
        return LandingComponenteMapper_1.LandingComponenteMapper.toDomain(created);
    }
    async unassign(id_landing, id_componente) {
        await Models_1.LandingComponenteModel.destroy({
            where: { id_landing, id_componente },
        });
    }
}
exports.LandingComponenteCommandRepository = LandingComponenteCommandRepository;
