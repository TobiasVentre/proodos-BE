import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createComponenteController } from "../Controllers/ComponenteController";
import { createLandingPageController } from "../Controllers/LandingPageController";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";
import { LandingComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingComponenteRepository";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";

export const buildRoutes = (logger: ILogger) => {
  const routes = Router();

  const componenteRepository = new ComponenteRepository(logger);
  const landingPageRepository = new LandingPageRepository();
  const landingComponenteRepository = new LandingComponenteRepository();

  routes.use(
    "/componentes",
    createComponenteController({
      createComponenteService: new CreateComponenteService(componenteRepository),
      getAllComponentesService: new GetAllComponentesService(componenteRepository),
      getComponenteByIdService: new GetComponenteByIdService(componenteRepository),
      patchComponenteService: new PatchComponenteService(componenteRepository),
    })
  );
  routes.use(
    "/landings",
    createLandingPageController({
      createLandingPageService: new CreateLandingPageService(landingPageRepository),
      getLandingPageByIdService: new GetLandingPageByIdService(landingPageRepository),
      getAllLandingPagesService: new GetAllLandingPagesService(landingPageRepository),
      assignLandingComponenteService: new AssignLandingComponenteService(
        landingPageRepository,
        componenteRepository,
        landingComponenteRepository
      ),
    })
  );

  return routes;
};
