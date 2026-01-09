import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createComponenteController } from "../Controllers/ComponenteController";
import { LandingPageController } from "../Controllers/LandingPageController";

export const buildRoutes = (logger: ILogger) => {
  const routes = Router();

  routes.use("/componentes", createComponenteController(logger));
  routes.use("/landings", LandingPageController);

  return routes;
};
