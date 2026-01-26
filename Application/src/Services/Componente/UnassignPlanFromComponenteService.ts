import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { UnassignPlanFromComponenteUseCase } from "../../Ports/ComponenteUseCases";

export class UnassignPlanFromComponenteService implements UnassignPlanFromComponenteUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_componente: number): Promise<Componente> {
    return this.componenteRepository.patch(id_componente, { id_plan: null });
  }
}
