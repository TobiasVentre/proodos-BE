"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteRepository = void 0;
const LandingComponenteCommandRepository_1 = require("./Commands/LandingComponenteCommandRepository");
const LandingComponenteQueryRepository_1 = require("./Queries/LandingComponenteQueryRepository");
class LandingComponenteRepository {
    constructor() {
        this.commandRepository = new LandingComponenteCommandRepository_1.LandingComponenteCommandRepository();
        this.queryRepository = new LandingComponenteQueryRepository_1.LandingComponenteQueryRepository();
    }
    async assign(entity) {
        return this.commandRepository.assign(entity);
    }
    async unassign(id_landing, id_componente) {
        return this.commandRepository.unassign(id_landing, id_componente);
    }
    async getByLanding(id_landing) {
        return this.queryRepository.getByLanding(id_landing);
    }
    async getByComponente(id_componente) {
        return this.queryRepository.getByComponente(id_componente);
    }
    async exists(id_landing, id_componente) {
        return this.queryRepository.exists(id_landing, id_componente);
    }
    async existsByComponente(id_componente) {
        return this.queryRepository.existsByComponente(id_componente);
    }
}
exports.LandingComponenteRepository = LandingComponenteRepository;
