"use strict";
import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_config_1 = require("./Swagger/swagger.config");
const routes_1 = require("./Routes/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger
(0, swagger_config_1.setupSwagger)(app);
// API Routes
app.use("/api", routes_1.routes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Running on http://localhost:${PORT}/docs`);
});

sequelize.authenticate()
  .then(() => console.log("[DB] Conectado con Windows Authentication"))
  .catch(err => console.error("[DB] Error de conexión:", err));
