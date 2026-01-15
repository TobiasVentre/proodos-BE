import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  CreateComponenteUseCase,
  DeleteComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponenteByIdUseCase,
  PatchComponenteUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";
import {
  CreateLandingPageUseCase,
  GetAllLandingPagesUseCase,
  GetLandingPageByIdUseCase,
} from "@proodos/application/Ports/LandingPageUseCases";
import {
  CreatePlanUseCase,
  GetAllPlansUseCase,
  GetPlanByIdUseCase,
  PatchPlanUseCase,
  UpdatePlanUseCase,
} from "@proodos/application/Ports/PlanUseCases";
import {
  AssignLandingComponenteUseCase,
  GetLandingComponentesUseCase,
  GetLandingsByComponenteUseCase,
  UnassignLandingComponenteUseCase,
} from "@proodos/application/Ports/LandingComponenteUseCases";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { DeleteComponenteService } from "@proodos/application/Services/Componente/DeleteComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { GetLandingComponentesService } from "@proodos/application/Services/LandingComponente/GetLandingComponentesService";
import { GetLandingsByComponenteService } from "@proodos/application/Services/LandingComponente/GetLandingsByComponenteService";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { CreatePlanService } from "@proodos/application/Services/Plan/CreatePlanService";
import { GetAllPlansService } from "@proodos/application/Services/Plan/GetAllPlansService";
import { GetPlanByIdService } from "@proodos/application/Services/Plan/GetPlanByIdService";
import { PatchPlanService } from "@proodos/application/Services/Plan/PatchPlanService";
import { UpdatePlanService } from "@proodos/application/Services/Plan/UpdatePlanService";
import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";
import { UnassignComponenteFromLandingService } from "@proodos/application/Services/LandingComponente/UnassignComponenteFromLandingService";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";
import { LandingComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingComponenteRepository";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";
import { PlanRepository } from "@proodos/infrastructure/Persistence/Repositories/PlanRepository";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";

export type ApiUseCases = {
  componente: {
    createComponente: CreateComponenteUseCase;
    getAllComponentes: GetAllComponentesUseCase;
    getComponenteById: GetComponenteByIdUseCase;
    patchComponente: PatchComponenteUseCase;
    deleteComponente: DeleteComponenteUseCase;
    getLandingsByComponente: GetLandingsByComponenteUseCase;
  };
  landing: {
    createLandingPage: CreateLandingPageUseCase;
    getAllLandingPages: GetAllLandingPagesUseCase;
    getLandingPageById: GetLandingPageByIdUseCase;
    assignLandingComponente: AssignLandingComponenteUseCase;
    unassignLandingComponente: UnassignLandingComponenteUseCase;
    getLandingComponentes: GetLandingComponentesUseCase;
  };
  plan: {
    createPlan: CreatePlanUseCase;
    getAllPlans: GetAllPlansUseCase;
    getPlanById: GetPlanByIdUseCase;
    patchPlan: PatchPlanUseCase;
    updatePlan: UpdatePlanUseCase;
  };
};

export const buildApiUseCases = async (logger: ILogger): Promise<ApiUseCases> => {
  await initModels();

  const componenteRepository = new ComponenteRepository(logger);
  const landingPageRepository = new LandingPageRepository(logger);
  const landingComponenteRepository = new LandingComponenteRepository();
  const planRepository = new PlanRepository(logger);

  return {
    componente: {
      createComponente: new CreateComponenteService(componenteRepository, planRepository, logger),
      getAllComponentes: new GetAllComponentesService(componenteRepository),
      getComponenteById: new GetComponenteByIdService(componenteRepository),
      patchComponente: new PatchComponenteService(componenteRepository, planRepository),
      deleteComponente: new DeleteComponenteService(
        componenteRepository,
        landingComponenteRepository
      ),
      getLandingsByComponente: new GetLandingsByComponenteService(landingComponenteRepository),
    },
    landing: {
      createLandingPage: new CreateLandingPageService(landingPageRepository, logger),
      getAllLandingPages: new GetAllLandingPagesService(landingPageRepository, logger),
      getLandingPageById: new GetLandingPageByIdService(landingPageRepository, logger),
      assignLandingComponente: new AssignLandingComponenteService(
        landingPageRepository,
        componenteRepository,
        landingComponenteRepository,
        logger
      ),
      unassignLandingComponente: new UnassignComponenteFromLandingService(
        landingComponenteRepository
      ),
      getLandingComponentes: new GetLandingComponentesService(landingComponenteRepository),
    },
    plan: {
      createPlan: new CreatePlanService(planRepository, logger),
      getAllPlans: new GetAllPlansService(planRepository, logger),
      getPlanById: new GetPlanByIdService(planRepository, logger),
      patchPlan: new PatchPlanService(planRepository, logger),
      updatePlan: new UpdatePlanService(planRepository, logger),
    },
  };
};
