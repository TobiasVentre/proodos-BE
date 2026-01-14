"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComponenteService = void 0;
class CreateComponenteService {
    constructor(componenteRepository, logger) {
        this.componenteRepository = componenteRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateComponenteService.execute()");
        return await this.componenteRepository.create(dto);
    }
}
exports.CreateComponenteService = CreateComponenteService;
