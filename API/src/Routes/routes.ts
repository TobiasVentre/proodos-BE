import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createComponenteController } from "../Controllers/ComponenteController";
import { createLandingPageController } from "../Controllers/LandingPageController";
import { createPlanController } from "../Controllers/PlanController";
import { buildApiUseCases } from "@proodos/api/CompositionRoot/ApiContainer";

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
      deleteComponenteService: useCases.componente.deleteComponente,
      softDeleteComponenteService: useCases.componente.softDeleteComponente,
      getLandingsByComponenteService: useCases.componente.getLandingsByComponente,
      assignComponenteHijoService: useCases.componente.assignComponenteHijo,
      unassignComponenteHijoService: useCases.componente.unassignComponenteHijo,
      getComponenteTreeService: useCases.componente.getComponenteTree,
    })
  );
  routes.use(
    "/landings",
    createLandingPageController({
      createLandingPageService: useCases.landing.createLandingPage,
      getLandingPageByIdService: useCases.landing.getLandingPageById,
      getAllLandingPagesService: useCases.landing.getAllLandingPages,
      updateLandingPageService: useCases.landing.updateLandingPage,
      patchLandingPageService: useCases.landing.patchLandingPage,
      deleteLandingPageService: useCases.landing.deleteLandingPage,
      assignLandingComponenteService: useCases.landing.assignLandingComponente,
      unassignLandingComponenteService: useCases.landing.unassignLandingComponente,
      getLandingComponentesService: useCases.landing.getLandingComponentes,
    })
  );
  routes.use(
    "/planes",
    createPlanController({
      createPlanService: useCases.plan.createPlan,
      getAllPlansService: useCases.plan.getAllPlans,
      getPlanByIdService: useCases.plan.getPlanById,
      patchPlanService: useCases.plan.patchPlan,
      updatePlanService: useCases.plan.updatePlan,
      getComponentesByPlanService: useCases.componente.getComponentesByPlan,
    })
  );

  return routes;
};
