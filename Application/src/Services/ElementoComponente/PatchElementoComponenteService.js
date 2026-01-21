"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchElementoComponenteService = void 0;
const NotFoundError_1 = require("../../Errors/NotFoundError");
class PatchElementoComponenteService {
    constructor(elementoComponenteRepository, componenteRepository, tipoElementoRepository) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.componenteRepository = componenteRepository;
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(id_elemento, dto) {
        if (dto.id_componente !== undefined) {
            const componente = await this.componenteRepository.getById(dto.id_componente);
            if (!componente) {
                throw new NotFoundError_1.NotFoundError("Componente not found");
            }
        }
        if (dto.id_tipo_elemento !== undefined) {
            const tipoElementoExists = await this.tipoElementoRepository.exists(dto.id_tipo_elemento);
            if (!tipoElementoExists) {
                throw new NotFoundError_1.NotFoundError("Tipo elemento not found");
            }
        }
        return this.elementoComponenteRepository.patch(id_elemento, dto);
    }
}
exports.PatchElementoComponenteService = PatchElementoComponenteService;
