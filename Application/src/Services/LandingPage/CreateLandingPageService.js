"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLandingPageService = void 0;
class CreateLandingPageService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(dto) {
        console.log("[Service] CreateLandingPageService.execute()");
        return await this.landingPageRepository.create(dto);
    }
}
exports.CreateLandingPageService = CreateLandingPageService;
