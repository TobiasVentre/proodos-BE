"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchLandingPageService = void 0;
const NotFoundError_1 = require("../../Errors/NotFoundError");
const ValidationError_1 = require("../../Errors/ValidationError");
const ensureNonEmptyString = (field, value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new ValidationError_1.ValidationError("VALIDATION_ERROR", `${field} must be a non-empty string`, {
            field,
        });
    }
    return value.trim();
};
class PatchLandingPageService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(id_landing, dto) {
        const existing = await this.landingPageRepository.getById(id_landing);
        if (!existing) {
            throw new NotFoundError_1.NotFoundError("Landing not found");
        }
        if (Object.keys(dto).length === 0) {
            throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "No fields provided", {
                required: ["URL", "estado", "segmento"],
            });
        }
        const updated = {
            ...existing,
            URL: dto.URL !== undefined ? ensureNonEmptyString("URL", dto.URL) : existing.URL,
            estado: dto.estado !== undefined ? ensureNonEmptyString("estado", dto.estado) : existing.estado,
            segmento: dto.segmento !== undefined ? ensureNonEmptyString("segmento", dto.segmento) : existing.segmento,
        };
        return this.landingPageRepository.update(updated);
    }
}
exports.PatchLandingPageService = PatchLandingPageService;
