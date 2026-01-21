"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageMapper = void 0;
const ValidationError_1 = require("../../Errors/ValidationError");
const LandingPage_1 = require("@proodos/domain/Entities/LandingPage");
const ensureNonEmptyString = (field, value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new ValidationError_1.ValidationError("VALIDATION_ERROR", `${field} must be a non-empty string`, {
            field,
        });
    }
    return value.trim();
};
const ensurePositiveInteger = (field, value) => {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new ValidationError_1.ValidationError("VALIDATION_ERROR", `${field} must be a positive integer`, {
            field,
        });
    }
    return value;
};
exports.LandingPageMapper = {
    fromCreateCommand(dto) {
        const landing = new LandingPage_1.LandingPage();
        landing.URL = ensureNonEmptyString("URL", dto.URL);
        landing.estado = ensureNonEmptyString("estado", dto.estado);
        landing.segmento = ensureNonEmptyString("segmento", dto.segmento);
        return landing;
    },
    fromUpdateCommand(dto) {
        const landing = new LandingPage_1.LandingPage();
        landing.id_landing = ensurePositiveInteger("id_landing", dto.id_landing);
        landing.URL = ensureNonEmptyString("URL", dto.URL);
        landing.estado = ensureNonEmptyString("estado", dto.estado);
        landing.segmento = ensureNonEmptyString("segmento", dto.segmento);
        return landing;
    },
};
