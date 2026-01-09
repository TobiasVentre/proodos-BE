"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLandingPageService = void 0;
class UpdateLandingPageService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(dto) {
        return await this.landingPageRepository.update(dto);
    }
}
exports.UpdateLandingPageService = UpdateLandingPageService;
