import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IUnassignPlanFromComponenteUseCase } from "../../Ports/IComponenteUseCases";

export class UnassignPlanFromComponenteService implements IUnassignPlanFromComponenteUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_componente: number): Promise<Componente> {
    return this.componenteRepository.patch(id_componente, { id_plan: null });
  }
}
