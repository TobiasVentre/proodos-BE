import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";

export type CompositionRoot = {
  createComponenteService: CreateComponenteService;
};

export const buildCompositionRoot = (): CompositionRoot => {
  const componenteRepository = new ComponenteRepository();
  const createComponenteService = new CreateComponenteService(componenteRepository);

  return {
    createComponenteService,
  };
};
