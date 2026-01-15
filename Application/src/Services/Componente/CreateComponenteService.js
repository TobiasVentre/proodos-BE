"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComponenteService = void 0;
const ValidationError_1 = require("../../Errors/ValidationError");
class CreateComponenteService {
    constructor(componenteRepository, planRepository, logger) {
        this.componenteRepository = componenteRepository;
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(dto) {
        if (this.logger && this.logger.info) {
            this.logger.info("[Service] CreateComponenteService.execute()");
        }
        const planExists = await this.planRepository.exists(dto.id_plan);
        if (!planExists) {
            throw new ValidationError_1.ValidationError("IC-04", "Plan no existe");
        }
        return await this.componenteRepository.create(dto);
    }
}
exports.CreateComponenteService = CreateComponenteService;
