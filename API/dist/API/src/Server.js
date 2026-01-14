"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadEnv_1 = require("./Config/loadEnv");
(0, loadEnv_1.loadEnv)();
const express_1 = __importDefault(require("express"));
const swagger_config_1 = require("./Swagger/swagger.config");
const routes_1 = require("./Routes/routes");
const ConsoleLogger_1 = require("./Logging/ConsoleLogger");
const app = (0, express_1.default)();
const logger = new ConsoleLogger_1.ConsoleLogger();
app.use(express_1.default.json());
// Swagger
(0, swagger_config_1.setupSwagger)(app);
const startServer = async () => {
    // API Routes
    app.use("/api", await (0, routes_1.buildRoutes)(logger));
    const PORT = 3000;
    app.listen(PORT, () => {
        logger.info(`API Running on http://localhost:${PORT}/docs`);
    });
};
startServer();
console.log("[API RUNTIME ENV]", {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
});
