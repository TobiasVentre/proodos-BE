"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const schemas_1 = require("./schemas");
function setupSwagger(app) {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Proodos API",
                version: "1.0.0",
                description: "Documentación de la API del sistema Proodos"
            },
            components: {
                schemas: {
                    ...schemas_1.componenteSchemas,
                    ...schemas_1.planSchemas,
                    ...schemas_1.landingSchemas,
                    ...schemas_1.tipoComponenteSchemas,
                    ...schemas_1.tipoVariacionSchemas,
                    ...schemas_1.tipoElementoSchemas,
                    ...schemas_1.elementoComponenteSchemas
                }
            }
        },
        apis: ["./src/Controllers/*.ts"],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/docs", ...swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
}
