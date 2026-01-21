"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const AppError_1 = require("./AppError");
class ValidationError extends AppError_1.AppError {
    constructor(code, message, details) {
        super(code, message, 400, details);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
