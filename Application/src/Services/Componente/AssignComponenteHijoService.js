"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignComponenteHijoService = void 0;
const NotFoundError_1 = require("../../Errors/NotFoundError");
class AssignComponenteHijoService {
    constructor(componenteRepository, compuestoRepository) {
        this.componenteRepository = componenteRepository;
        this.compuestoRepository = compuestoRepository;
    }
    async execute(id_padre, id_hijo) {
        const padre = await this.componenteRepository.getById(id_padre);
        if (!padre) {
            throw new NotFoundError_1.NotFoundError("Parent componente not found");
        }
        const hijo = await this.componenteRepository.getById(id_hijo);
        if (!hijo) {
            throw new NotFoundError_1.NotFoundError("Child componente not found");
        }
        return this.compuestoRepository.assign(id_padre, id_hijo);
    }
}
exports.AssignComponenteHijoService = AssignComponenteHijoService;
