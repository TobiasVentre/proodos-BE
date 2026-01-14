import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  CreateComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponenteByIdUseCase,
  PatchComponenteUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";
import {
  CreateLandingPageUseCase,
  GetAllLandingPagesUseCase,
  GetLandingPageByIdUseCase,
} from "@proodos/application/Ports/LandingPageUseCases";
import { AssignLandingComponenteUseCase } from "@proodos/application/Ports/LandingComponenteUseCases";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";
import { ComponenteRepository } from "../Persistence/Repositories/ComponenteRepository";
import { LandingComponenteRepository } from "../Persistence/Repositories/LandingComponenteRepository";
import { LandingPageRepository } from "../Persistence/Repositories/LandingPageRepository";

export type ApiUseCases = {
  componente: {
    createComponente: CreateComponenteUseCase;
    getAllComponentes: GetAllComponentesUseCase;
    getComponenteById: GetComponenteByIdUseCase;
    patchComponente: PatchComponenteUseCase;
  };
  landing: {
    createLandingPage: CreateLandingPageUseCase;
    getAllLandingPages: GetAllLandingPagesUseCase;
    getLandingPageById: GetLandingPageByIdUseCase;
    assignLandingComponente: AssignLandingComponenteUseCase;
  };
};

export const buildApiUseCases = (logger: ILogger): ApiUseCases => {
  const componenteRepository = new ComponenteRepository(logger);
  const landingPageRepository = new LandingPageRepository();
  const landingComponenteRepository = new LandingComponenteRepository();

  return {
    componente: {
      createComponente: new CreateComponenteService(componenteRepository),
      getAllComponentes: new GetAllComponentesService(componenteRepository),
      getComponenteById: new GetComponenteByIdService(componenteRepository),
      patchComponente: new PatchComponenteService(componenteRepository),
    },
    landing: {
      createLandingPage: new CreateLandingPageService(landingPageRepository),
      getAllLandingPages: new GetAllLandingPagesService(landingPageRepository),
      getLandingPageById: new GetLandingPageByIdService(landingPageRepository),
      assignLandingComponente: new AssignLandingComponenteService(
        landingPageRepository,
        componenteRepository,
        landingComponenteRepository
      ),
    },
  };
};
