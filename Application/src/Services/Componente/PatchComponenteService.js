"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchComponenteService = void 0;
const ValidationError_1 = require("../../Errors/ValidationError");
class PatchComponenteService {
    constructor(repo, planRepository) {
        this.repo = repo;
        this.planRepository = planRepository;
    }
    async execute(id_componente, dto) {
        if (dto.id_plan !== undefined) {
            const planExists = await this.planRepository.exists(dto.id_plan);
            if (!planExists) {
                throw new ValidationError_1.ValidationError("IC-04", "Plan no existe");
            }
        }
        return this.repo.patch(id_componente, dto);
    }
}
exports.PatchComponenteService = PatchComponenteService;
