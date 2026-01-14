
import { loadEnv } from "./Config/loadEnv";
loadEnv();

import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { buildRoutes } from "./Routes/routes";
import { ConsoleLogger } from "./Logging/ConsoleLogger";


const app = express();
const logger = new ConsoleLogger();

app.use(express.json());

// Swagger
setupSwagger(app);

const startServer = async () => {
  // API Routes
  app.use("/api", await buildRoutes(logger));

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
