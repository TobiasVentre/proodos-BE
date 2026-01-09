import { Router } from "express";
import { createComponenteController } from "../Controllers/ComponenteController";
import { createLandingPageController } from "../Controllers/LandingPageController";
import { CompositionRoot } from "../CompositionRoot";

export const createRoutes = (compositionRoot: CompositionRoot) => {
  const routes = Router();

  routes.use(
    "/componentes",
    createComponenteController({
      createComponenteService: compositionRoot.createComponenteService,
    })
  );
  routes.use("/landings", createLandingPageController());

  return routes;
};
