import { loadEnv } from "./Config/loadEnv";
import { bootstrapLogger } from "./Logging/BootstrapLogger";
loadEnv(bootstrapLogger);

import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { buildRoutes } from "./Routes/routes";
import { createErrorHandler } from "./Middleware/ErrorHandler";
import { authenticateJWT, getAdminRoles, requireAnyRole } from "./Middleware/auth";


const app = express();
const logger = bootstrapLogger;
const PORT = Number(process.env.PORT || 8000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const ENABLE_SWAGGER = String(process.env.ENABLE_SWAGGER ?? "true").toLowerCase() !== "false";

app.use(express.json());
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
  setupSwagger(app);
}

const startServer = async () => {
  // API Routes
  app.use("/api", authenticateJWT, requireAnyRole(getAdminRoles()), await buildRoutes(logger));
  app.use(createErrorHandler(logger));

  app.listen(PORT, () => {
    const docsPath = ENABLE_SWAGGER ? "/docs" : "";
    logger.info(`API Running on http://localhost:${PORT}${docsPath}`);
  });
};

logger.debug("[API RUNTIME ENV]", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
});

void startServer().catch((error) => {
  logger.error("[Bootstrap] Failed to start server", error);
  process.exit(1);
});
