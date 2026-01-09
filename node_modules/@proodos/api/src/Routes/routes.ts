import { Router } from "express";
import { ComponenteController } from "../Controllers/ComponenteController";
import { LandingPageController } from "../Controllers/LandingPageController";

export const routes = Router();

routes.use("/componentes", ComponenteController);
routes.use("/landings", LandingPageController);
