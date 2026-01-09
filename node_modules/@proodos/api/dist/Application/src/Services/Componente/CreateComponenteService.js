"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComponenteService = void 0;
class CreateComponenteService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(dto) {
        console.log("[Service] CreateComponenteService.execute()");
        return await this.componenteRepository.create(dto);
    }
}
exports.CreateComponenteService = CreateComponenteService;
