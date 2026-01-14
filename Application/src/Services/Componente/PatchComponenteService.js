"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchComponenteService = void 0;
class PatchComponenteService {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id_componente, dto) {
        return this.repo.patch(id_componente, dto);
    }
}
exports.PatchComponenteService = PatchComponenteService;
