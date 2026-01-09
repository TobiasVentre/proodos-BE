import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export function setupSwagger(app: Express): void {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Proodos API",
        version: "1.0.0",
        description: "Documentación de la API del sistema Proodos"
      }
    },
    apis: ["./src/Controllers/*.ts"], 
  };

  const specs = swaggerJsdoc(options);

app.use("/docs", ...swaggerUi.serve, swaggerUi.setup(specs));

}
