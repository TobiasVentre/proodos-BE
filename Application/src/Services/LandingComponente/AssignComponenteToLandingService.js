"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignComponenteToLandingService = void 0;
class AssignComponenteToLandingService {
    constructor(landingComponenteRepository) {
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(dto) {
        return await this.landingComponenteRepository.assign(dto);
    }
}
exports.AssignComponenteToLandingService = AssignComponenteToLandingService;
