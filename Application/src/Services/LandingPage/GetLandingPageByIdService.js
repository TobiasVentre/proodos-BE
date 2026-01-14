"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLandingPageByIdService = void 0;
class GetLandingPageByIdService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(id_landing) {
        console.log("[Service] GetLandingPageByIdService.execute()", { id_landing });
        return await this.landingPageRepository.getById(id_landing);
    }
}
exports.GetLandingPageByIdService = GetLandingPageByIdService;
