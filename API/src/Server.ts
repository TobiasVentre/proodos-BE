import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { createRoutes } from "./Routes/routes";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";
import { buildCompositionRoot } from "./CompositionRoot";

const app = express();

app.use(express.json());

initModels();

const compositionRoot = buildCompositionRoot();

// Swagger
setupSwagger(app);

// API Routes
app.use("/api", createRoutes(compositionRoot));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Running on http://localhost:${PORT}/docs`);
});
