"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLandingPagesService = void 0;
class GetAllLandingPagesService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute() {
        return await this.landingPageRepository.getAll();
    }
}
exports.GetAllLandingPagesService = GetAllLandingPagesService;
