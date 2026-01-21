"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateElementoComponenteService = void 0;
const ElementoComponenteDTOMapper_1 = require("../../DTOs/ElementoComponente/ElementoComponenteDTOMapper");
const NotFoundError_1 = require("../../Errors/NotFoundError");
class UpdateElementoComponenteService {
    constructor(elementoComponenteRepository, componenteRepository, tipoElementoRepository) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.componenteRepository = componenteRepository;
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(dto) {
        const componente = await this.componenteRepository.getById(dto.id_componente);
        if (!componente) {
            throw new NotFoundError_1.NotFoundError("Componente not found");
        }
        const tipoElementoExists = await this.tipoElementoRepository.exists(dto.id_tipo_elemento);
        if (!tipoElementoExists) {
            throw new NotFoundError_1.NotFoundError("Tipo elemento not found");
        }
        const entity = (0, ElementoComponenteDTOMapper_1.mapUpdateElementoComponenteDTOToEntity)(dto);
        return this.elementoComponenteRepository.update(entity);
    }
}
exports.UpdateElementoComponenteService = UpdateElementoComponenteService;
