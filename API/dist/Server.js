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
const ErrorHandler_1 = require("./Middleware/ErrorHandler");
const app = (0, express_1.default)();
const logger = new ConsoleLogger_1.ConsoleLogger();
const PORT = Number(process.env.PORT || 8000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const ENABLE_SWAGGER = String(process.env.ENABLE_SWAGGER ?? "true").toLowerCase() !== "false";
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CORS_ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    return next();
});
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
if (ENABLE_SWAGGER) {
    (0, swagger_config_1.setupSwagger)(app);
}
const startServer = async () => {
    // API Routes
    app.use("/api", await (0, routes_1.buildRoutes)(logger));
    app.use(ErrorHandler_1.errorHandler);
    app.listen(PORT, () => {
        const docsPath = ENABLE_SWAGGER ? "/docs" : "";
        logger.info(`API Running on http://localhost:${PORT}${docsPath}`);
    });
};
startServer();
console.log("[API RUNTIME ENV]", {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
});
