import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateComponenteUseCase,
  IDeleteComponenteUseCase,
  ISoftDeleteComponenteUseCase,
  IGetAllComponentesUseCase,
  IGetComponentesByPlanUseCase,
  IGetComponenteByIdUseCase,
  IGetComponenteTreeUseCase,
  IPatchComponenteUseCase,
  IUpdateComponenteUseCase,
  IAssignComponenteHijoUseCase,
  IUnassignComponenteHijoUseCase,
  IAssignPlanToComponenteUseCase,
  IUnassignPlanFromComponenteUseCase,
} from "@proodos/application/Ports/IComponenteUseCases";
import {
  ICreateLandingPageUseCase,
  IDeleteLandingPageUseCase,
  IGetAllLandingPagesUseCase,
  IGenerateLandingIndexUseCase,
  IGetLandingPageByIdUseCase,
  IPatchLandingPageUseCase,
  IUpdateLandingPageUseCase,
} from "@proodos/application/Ports/ILandingPageUseCases";
import {
  ICreatePlanUseCase,
  ICreatePlanFullUseCase,
  IDeletePlanUseCase,
  IGetAllPlansUseCase,
  IGetPlansDataUseCase,
  IGetPlanByIdUseCase,
  IPatchPlanUseCase,
  IPatchPlanFullUseCase,
  IPublishPlansUseCase,
  IUpdatePlanFullUseCase,
  IUpdatePlanUseCase,
} from "@proodos/application/Ports/IPlanUseCases";
import {
  ICreateTipoComponenteUseCase,
  IDeleteTipoComponenteUseCase,
  IGetAllTiposComponenteUseCase,
  IGetTipoComponenteByIdUseCase,
  IPatchTipoComponenteUseCase,
  IUpdateTipoComponenteUseCase,
} from "@proodos/application/Ports/ITipoComponenteUseCases";
import {
  ICreateTipoVariacionUseCase,
  IDeleteTipoVariacionUseCase,
  IGetAllTiposVariacionUseCase,
  IGetTipoVariacionByIdUseCase,
  IGetVariacionesByTipoComponenteUseCase,
  IPatchTipoVariacionUseCase,
  IUpdateTipoVariacionUseCase,
} from "@proodos/application/Ports/ITipoVariacionUseCases";
import {
  ICreateTipoElementoUseCase,
  IDeleteTipoElementoUseCase,
  IGetAllTiposElementoUseCase,
  IGetTipoElementoByIdUseCase,
  IPatchTipoElementoUseCase,
  IUpdateTipoElementoUseCase,
} from "@proodos/application/Ports/ITipoElementoUseCases";
import {
  ICreateElementoComponenteUseCase,
  IDeleteElementoComponenteUseCase,
  IGetAllElementosComponenteUseCase,
  IGetElementoComponenteAsignacionesUseCase,
  IGetElementoComponenteByIdUseCase,
  IGetElementosByComponenteUseCase,
  IPatchElementoComponenteUseCase,
  IReplaceElementoComponenteAsignacionesUseCase,
  IUpdateElementoComponenteUseCase,
} from "@proodos/application/Ports/IElementoComponenteUseCases";
import {
  IAssignLandingComponenteUseCase,
  IGetLandingComponentesUseCase,
  IGetLandingsByComponenteUseCase,
  IUpdateLandingComponenteOrdenUseCase,
  IUnassignLandingComponenteUseCase,
} from "@proodos/application/Ports/ILandingComponenteUseCases";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { DeleteComponenteService } from "@proodos/application/Services/Componente/DeleteComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponentesByPlanService } from "@proodos/application/Services/Componente/GetComponentesByPlanService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { SoftDeleteComponenteService } from "@proodos/application/Services/Componente/SoftDeleteComponenteService";
import { UpdateComponenteService } from "@proodos/application/Services/Componente/UpdateComponenteService";
import { AssignComponenteHijoService } from "@proodos/application/Services/Componente/AssignComponenteHijoService";
import { AssignPlanToComponenteService } from "@proodos/application/Services/Componente/AssignPlanToComponenteService";
import { UnassignComponenteHijoService } from "@proodos/application/Services/Componente/UnassignComponenteHijoService";
import { UnassignPlanFromComponenteService } from "@proodos/application/Services/Componente/UnassignPlanFromComponenteService";
import { GetComponenteTreeService } from "@proodos/application/Services/Componente/GetComponenteTreeService";
import { GetLandingComponentesService } from "@proodos/application/Services/LandingComponente/GetLandingComponentesService";
import { GetLandingsByComponenteService } from "@proodos/application/Services/LandingComponente/GetLandingsByComponenteService";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { GenerateLandingIndexService } from "@proodos/application/Services/LandingPage/GenerateLandingIndexService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { PatchLandingPageService } from "@proodos/application/Services/LandingPage/PatchLandingPageService";
import { UpdateLandingPageService } from "@proodos/application/Services/LandingPage/UpdateLandingPageService";
import { DeleteLandingPageService } from "@proodos/application/Services/LandingPage/DeleteLandingPageService";
import { CreatePlanService } from "@proodos/application/Services/Plan/CreatePlanService";
import { CreatePlanFullService } from "@proodos/application/Services/Plan/CreatePlanFullService";
import { GetAllPlansService } from "@proodos/application/Services/Plan/GetAllPlansService";
import { GetPlansDataService } from "@proodos/application/Services/Plan/GetPlansDataService";
import { GetPlanByIdService } from "@proodos/application/Services/Plan/GetPlanByIdService";
import { PatchPlanService } from "@proodos/application/Services/Plan/PatchPlanService";
import { PatchPlanFullService } from "@proodos/application/Services/Plan/PatchPlanFullService";
import { PublishPlansService } from "@proodos/application/Services/Plan/PublishPlansService";
import { UpdatePlanFullService } from "@proodos/application/Services/Plan/UpdatePlanFullService";
import { UpdatePlanService } from "@proodos/application/Services/Plan/UpdatePlanService";
import { DeletePlanService } from "@proodos/application/Services/Plan/DeletePlanService";
import { CreateTipoComponenteService } from "@proodos/application/Services/TipoComponente/CreateTipoComponenteService";
import { GetAllTiposComponenteService } from "@proodos/application/Services/TipoComponente/GetAllTiposComponenteService";
import { GetTipoComponenteByIdService } from "@proodos/application/Services/TipoComponente/GetTipoComponenteByIdService";
import { UpdateTipoComponenteService } from "@proodos/application/Services/TipoComponente/UpdateTipoComponenteService";
import { PatchTipoComponenteService } from "@proodos/application/Services/TipoComponente/PatchTipoComponenteService";
import { DeleteTipoComponenteService } from "@proodos/application/Services/TipoComponente/DeleteTipoComponenteService";
import { CreateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/CreateTipoVariacionService";
import { GetAllTiposVariacionService } from "@proodos/application/Services/TipoVariacion/GetAllTiposVariacionService";
import { GetTipoVariacionByIdService } from "@proodos/application/Services/TipoVariacion/GetTipoVariacionByIdService";
import { GetVariacionesByTipoComponenteService } from "@proodos/application/Services/TipoVariacion/GetVariacionesByTipoComponenteService";
import { UpdateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/UpdateTipoVariacionService";
import { PatchTipoVariacionService } from "@proodos/application/Services/TipoVariacion/PatchTipoVariacionService";
import { DeleteTipoVariacionService } from "@proodos/application/Services/TipoVariacion/DeleteTipoVariacionService";
import { CreateTipoElementoService } from "@proodos/application/Services/TipoElemento/CreateTipoElementoService";
import { GetAllTiposElementoService } from "@proodos/application/Services/TipoElemento/GetAllTiposElementoService";
import { GetTipoElementoByIdService } from "@proodos/application/Services/TipoElemento/GetTipoElementoByIdService";
import { UpdateTipoElementoService } from "@proodos/application/Services/TipoElemento/UpdateTipoElementoService";
import { PatchTipoElementoService } from "@proodos/application/Services/TipoElemento/PatchTipoElementoService";
import { DeleteTipoElementoService } from "@proodos/application/Services/TipoElemento/DeleteTipoElementoService";
import { CreateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/CreateElementoComponenteService";
import { GetAllElementosComponenteService } from "@proodos/application/Services/ElementoComponente/GetAllElementosComponenteService";
import { GetElementoComponenteByIdService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteByIdService";
import { GetElementosByComponenteService } from "@proodos/application/Services/ElementoComponente/GetElementosByComponenteService";
import { UpdateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/UpdateElementoComponenteService";
import { PatchElementoComponenteService } from "@proodos/application/Services/ElementoComponente/PatchElementoComponenteService";
import { DeleteElementoComponenteService } from "@proodos/application/Services/ElementoComponente/DeleteElementoComponenteService";
import { GetElementoComponenteAsignacionesService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteAsignacionesService";
import { ReplaceElementoComponenteAsignacionesService } from "@proodos/application/Services/ElementoComponente/ReplaceElementoComponenteAsignacionesService";
import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";
import { UnassignComponenteFromLandingService } from "@proodos/application/Services/LandingComponente/UnassignComponenteFromLandingService";
import { UpdateLandingComponenteOrdenService } from "@proodos/application/Services/LandingComponente/UpdateLandingComponenteOrdenService";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";
import { ComponenteCompuestoRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteCompuestoRepository";
import { LandingComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingComponenteRepository";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";
import { PlanRepository } from "@proodos/infrastructure/Persistence/Repositories/PlanRepository";
import { TipoComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoComponenteRepository";
import { TipoVariacionRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoVariacionRepository";
import { TipoElementoRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoElementoRepository";
import { ElementoComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ElementoComponenteRepository";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";
import { LandingExportAssetLoader } from "@proodos/infrastructure/Rendering/LandingExportAssetLoader";
import { LandingExportOutputWriter } from "@proodos/infrastructure/Rendering/LandingExportOutputWriter";
import { PlansDataOutputWriter } from "@proodos/infrastructure/Rendering/PlansDataOutputWriter";
import { PlansPublicationClient } from "@proodos/infrastructure/Clients/PlansPublicationClient";

export type ApiUseCases = {
  componente: {
    createComponente: ICreateComponenteUseCase;
    getAllComponentes: IGetAllComponentesUseCase;
    getComponenteById: IGetComponenteByIdUseCase;
    updateComponente: IUpdateComponenteUseCase;
    patchComponente: IPatchComponenteUseCase;
    deleteComponente: IDeleteComponenteUseCase;
    softDeleteComponente: ISoftDeleteComponenteUseCase;
    getComponentesByPlan: IGetComponentesByPlanUseCase;
    getLandingsByComponente: IGetLandingsByComponenteUseCase;
    assignComponenteHijo: IAssignComponenteHijoUseCase;
    unassignComponenteHijo: IUnassignComponenteHijoUseCase;
    getComponenteTree: IGetComponenteTreeUseCase;
    assignPlanToComponente: IAssignPlanToComponenteUseCase;
    unassignPlanFromComponente: IUnassignPlanFromComponenteUseCase;
  };
  landing: {
    createLandingPage: ICreateLandingPageUseCase;
    getAllLandingPages: IGetAllLandingPagesUseCase;
    getLandingPageById: IGetLandingPageByIdUseCase;
    generateLandingIndex: IGenerateLandingIndexUseCase;
    updateLandingPage: IUpdateLandingPageUseCase;
    patchLandingPage: IPatchLandingPageUseCase;
    deleteLandingPage: IDeleteLandingPageUseCase;
    assignLandingComponente: IAssignLandingComponenteUseCase;
    updateLandingComponenteOrden: IUpdateLandingComponenteOrdenUseCase;
    unassignLandingComponente: IUnassignLandingComponenteUseCase;
    getLandingComponentes: IGetLandingComponentesUseCase;
  };
  plan: {
    createPlan: ICreatePlanUseCase;
    createPlanFull: ICreatePlanFullUseCase;
    getAllPlans: IGetAllPlansUseCase;
    getPlansData: IGetPlansDataUseCase;
    getPlanById: IGetPlanByIdUseCase;
    patchPlan: IPatchPlanUseCase;
    patchPlanFull: IPatchPlanFullUseCase;
    publishPlans: IPublishPlansUseCase;
    updatePlanFull: IUpdatePlanFullUseCase;
    updatePlan: IUpdatePlanUseCase;
    deletePlan: IDeletePlanUseCase;
  };
  tipoComponente: {
    createTipoComponente: ICreateTipoComponenteUseCase;
    getAllTiposComponente: IGetAllTiposComponenteUseCase;
    getTipoComponenteById: IGetTipoComponenteByIdUseCase;
    updateTipoComponente: IUpdateTipoComponenteUseCase;
    patchTipoComponente: IPatchTipoComponenteUseCase;
    deleteTipoComponente: IDeleteTipoComponenteUseCase;
  };
  tipoVariacion: {
    createTipoVariacion: ICreateTipoVariacionUseCase;
    getAllTiposVariacion: IGetAllTiposVariacionUseCase;
    getTipoVariacionById: IGetTipoVariacionByIdUseCase;
    getVariacionesByTipoComponente: IGetVariacionesByTipoComponenteUseCase;
    updateTipoVariacion: IUpdateTipoVariacionUseCase;
    patchTipoVariacion: IPatchTipoVariacionUseCase;
    deleteTipoVariacion: IDeleteTipoVariacionUseCase;
  };
  tipoElemento: {
    createTipoElemento: ICreateTipoElementoUseCase;
    getAllTiposElemento: IGetAllTiposElementoUseCase;
    getTipoElementoById: IGetTipoElementoByIdUseCase;
    updateTipoElemento: IUpdateTipoElementoUseCase;
    patchTipoElemento: IPatchTipoElementoUseCase;
    deleteTipoElemento: IDeleteTipoElementoUseCase;
  };
  elementoComponente: {
    createElementoComponente: ICreateElementoComponenteUseCase;
    getAllElementosComponente: IGetAllElementosComponenteUseCase;
    getElementoComponenteById: IGetElementoComponenteByIdUseCase;
    getElementosByComponente: IGetElementosByComponenteUseCase;
    updateElementoComponente: IUpdateElementoComponenteUseCase;
    patchElementoComponente: IPatchElementoComponenteUseCase;
    deleteElementoComponente: IDeleteElementoComponenteUseCase;
    getElementoComponenteAsignaciones: IGetElementoComponenteAsignacionesUseCase;
    replaceElementoComponenteAsignaciones: IReplaceElementoComponenteAsignacionesUseCase;
  };
};

export const buildApiUseCases = async (logger: ILogger): Promise<ApiUseCases> => {
  await initModels(logger);

  const componenteRepository = new ComponenteRepository(logger);
  const componenteCompuestoRepository = new ComponenteCompuestoRepository(logger);
  const landingPageRepository = new LandingPageRepository(logger);
  const landingComponenteRepository = new LandingComponenteRepository(logger);
  const planRepository = new PlanRepository(logger);
  const tipoComponenteRepository = new TipoComponenteRepository(logger);
  const tipoVariacionRepository = new TipoVariacionRepository(logger);
  const tipoElementoRepository = new TipoElementoRepository(logger);
  const elementoComponenteRepository = new ElementoComponenteRepository(logger);
  const landingExportAssetLoader = new LandingExportAssetLoader(logger);
  const landingExportOutputWriter = new LandingExportOutputWriter(logger);
  const plansDataOutputWriter = new PlansDataOutputWriter(logger);
  const plansPublicationClient = new PlansPublicationClient(logger);

  return {
    componente: {
      createComponente: new CreateComponenteService(componenteRepository, planRepository, logger),
      getAllComponentes: new GetAllComponentesService(componenteRepository),
      getComponenteById: new GetComponenteByIdService(componenteRepository),
      updateComponente: new UpdateComponenteService(
        componenteRepository,
        planRepository,
        logger
      ),
      patchComponente: new PatchComponenteService(componenteRepository, planRepository),
      deleteComponente: new DeleteComponenteService(
        componenteRepository,
        landingComponenteRepository
      ),
      softDeleteComponente: new SoftDeleteComponenteService(
        componenteRepository,
        landingComponenteRepository
      ),
      getComponentesByPlan: new GetComponentesByPlanService(componenteRepository),
      getLandingsByComponente: new GetLandingsByComponenteService(landingComponenteRepository),
      assignComponenteHijo: new AssignComponenteHijoService(
        componenteRepository,
        componenteCompuestoRepository
      ),
      unassignComponenteHijo: new UnassignComponenteHijoService(componenteCompuestoRepository),
      getComponenteTree: new GetComponenteTreeService(
        componenteRepository,
        componenteCompuestoRepository
      ),
      assignPlanToComponente: new AssignPlanToComponenteService(
        componenteRepository,
        planRepository
      ),
      unassignPlanFromComponente: new UnassignPlanFromComponenteService(componenteRepository),
    },
    landing: {
      createLandingPage: new CreateLandingPageService(landingPageRepository, logger),
      getAllLandingPages: new GetAllLandingPagesService(landingPageRepository, logger),
      getLandingPageById: new GetLandingPageByIdService(landingPageRepository, logger),
      generateLandingIndex: new GenerateLandingIndexService(
        landingPageRepository,
        landingComponenteRepository,
        componenteRepository,
        componenteCompuestoRepository,
        planRepository,
        elementoComponenteRepository,
        tipoElementoRepository,
        tipoVariacionRepository,
        landingExportAssetLoader,
        landingExportOutputWriter,
        logger
      ),
      updateLandingPage: new UpdateLandingPageService(landingPageRepository),
      patchLandingPage: new PatchLandingPageService(landingPageRepository),
      deleteLandingPage: new DeleteLandingPageService(landingPageRepository),
      assignLandingComponente: new AssignLandingComponenteService(
        landingPageRepository,
        componenteRepository,
        landingComponenteRepository,
        logger
      ),
      updateLandingComponenteOrden: new UpdateLandingComponenteOrdenService(
        landingComponenteRepository
      ),
      unassignLandingComponente: new UnassignComponenteFromLandingService(
        landingComponenteRepository
      ),
      getLandingComponentes: new GetLandingComponentesService(landingComponenteRepository),
    },
    plan: {
      createPlan: new CreatePlanService(planRepository, logger),
      createPlanFull: new CreatePlanFullService(planRepository, logger),
      getAllPlans: new GetAllPlansService(planRepository, logger),
      getPlansData: new GetPlansDataService(
        planRepository,
        plansDataOutputWriter,
        logger
      ),
      getPlanById: new GetPlanByIdService(planRepository, logger),
      patchPlan: new PatchPlanService(planRepository, logger),
      patchPlanFull: new PatchPlanFullService(planRepository, logger),
      publishPlans: new PublishPlansService(
        new PatchPlanFullService(planRepository, logger),
        new GetPlansDataService(planRepository, plansDataOutputWriter, logger),
        plansDataOutputWriter,
        plansPublicationClient,
        logger
      ),
      updatePlanFull: new UpdatePlanFullService(planRepository, logger),
      updatePlan: new UpdatePlanService(planRepository, logger),
      deletePlan: new DeletePlanService(planRepository),
    },
    tipoComponente: {
      createTipoComponente: new CreateTipoComponenteService(
        tipoComponenteRepository,
        logger
      ),
      getAllTiposComponente: new GetAllTiposComponenteService(
        tipoComponenteRepository,
        logger
      ),
      getTipoComponenteById: new GetTipoComponenteByIdService(
        tipoComponenteRepository,
        logger
      ),
      updateTipoComponente: new UpdateTipoComponenteService(tipoComponenteRepository),
      patchTipoComponente: new PatchTipoComponenteService(tipoComponenteRepository),
      deleteTipoComponente: new DeleteTipoComponenteService(tipoComponenteRepository),
    },
    tipoVariacion: {
      createTipoVariacion: new CreateTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository,
        logger
      ),
      getAllTiposVariacion: new GetAllTiposVariacionService(
        tipoVariacionRepository,
        logger
      ),
      getTipoVariacionById: new GetTipoVariacionByIdService(
        tipoVariacionRepository,
        logger
      ),
      getVariacionesByTipoComponente: new GetVariacionesByTipoComponenteService(
        tipoVariacionRepository,
        logger
      ),
      updateTipoVariacion: new UpdateTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository
      ),
      patchTipoVariacion: new PatchTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository
      ),
      deleteTipoVariacion: new DeleteTipoVariacionService(tipoVariacionRepository),
    },
    tipoElemento: {
      createTipoElemento: new CreateTipoElementoService(tipoElementoRepository, logger),
      getAllTiposElemento: new GetAllTiposElementoService(tipoElementoRepository, logger),
      getTipoElementoById: new GetTipoElementoByIdService(tipoElementoRepository, logger),
      updateTipoElemento: new UpdateTipoElementoService(tipoElementoRepository),
      patchTipoElemento: new PatchTipoElementoService(tipoElementoRepository),
      deleteTipoElemento: new DeleteTipoElementoService(tipoElementoRepository),
    },
    elementoComponente: {
      createElementoComponente: new CreateElementoComponenteService(
        elementoComponenteRepository,
        componenteRepository,
        tipoElementoRepository,
        logger
      ),
      getAllElementosComponente: new GetAllElementosComponenteService(
        elementoComponenteRepository,
        logger
      ),
      getElementoComponenteById: new GetElementoComponenteByIdService(
        elementoComponenteRepository,
        logger
      ),
      getElementosByComponente: new GetElementosByComponenteService(
        elementoComponenteRepository,
        logger
      ),
      updateElementoComponente: new UpdateElementoComponenteService(
        elementoComponenteRepository,
        tipoElementoRepository
      ),
      patchElementoComponente: new PatchElementoComponenteService(
        elementoComponenteRepository,
        tipoElementoRepository
      ),
      deleteElementoComponente: new DeleteElementoComponenteService(
        elementoComponenteRepository
      ),
      getElementoComponenteAsignaciones: new GetElementoComponenteAsignacionesService(
        elementoComponenteRepository,
        logger
      ),
      replaceElementoComponenteAsignaciones: new ReplaceElementoComponenteAsignacionesService(
        elementoComponenteRepository,
        tipoVariacionRepository,
        componenteRepository,
        logger
      ),
    },
  };
};
