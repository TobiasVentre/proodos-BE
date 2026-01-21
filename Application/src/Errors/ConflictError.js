"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const AppError_1 = require("./AppError");
class ConflictError extends AppError_1.AppError {
    constructor(message, details) {
        super("CONFLICT", message, 409, details);
        this.name = "ConflictError";
    }
}
exports.ConflictError = ConflictError;
