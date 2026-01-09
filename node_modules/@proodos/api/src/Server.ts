import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { routes } from "./Routes/routes";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";

const app = express();

app.use(express.json());

initModels(); 

// Swagger
setupSwagger(app);

// API Routes
app.use("/api", routes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Running on http://localhost:${PORT}/docs`);
});
