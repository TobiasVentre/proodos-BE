import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { buildRoutes } from "./Routes/routes";
import { ConsoleLogger } from "./Logging/ConsoleLogger";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";

const app = express();
const logger = new ConsoleLogger();

app.use(express.json());

initModels(); 

// Swagger
setupSwagger(app);

// API Routes
app.use("/api", buildRoutes(logger));


const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`API Running on http://localhost:${PORT}/docs`);
});
