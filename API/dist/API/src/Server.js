"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_config_1 = require("./Swagger/swagger.config");
const routes_1 = require("./Routes/routes");
const Sequelize_1 = require("@proodos/infrastructure/Persistence/Sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, Sequelize_1.initModels)();
// Swagger
(0, swagger_config_1.setupSwagger)(app);
// API Routes
app.use("/api", routes_1.routes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Running on http://localhost:${PORT}/docs`);
});
