import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createComponenteController } from "../Controllers/ComponenteController";
import { createLandingPageController } from "../Controllers/LandingPageController";
import { buildApiUseCases } from "@proodos/infrastructure/CompositionRoot/ApiContainer";

export const buildRoutes = async (logger: ILogger) => {
  const routes = Router();
  const useCases = await buildApiUseCases(logger);

  routes.use(
    "/componentes",
    createComponenteController({
      createComponenteService: useCases.componente.createComponente,
      getAllComponentesService: useCases.componente.getAllComponentes,
      getComponenteByIdService: useCases.componente.getComponenteById,
      patchComponenteService: useCases.componente.patchComponente,
    })
  );
  routes.use(
    "/landings",
    createLandingPageController({
      createLandingPageService: useCases.landing.createLandingPage,
      getLandingPageByIdService: useCases.landing.getLandingPageById,
      getAllLandingPagesService: useCases.landing.getAllLandingPages,
      assignLandingComponenteService: useCases.landing.assignLandingComponente,
    })
  );

  return routes;
};
