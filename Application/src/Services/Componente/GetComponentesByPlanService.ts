import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IGetComponentesByPlanUseCase } from "../../Ports/IComponenteUseCases";

export class GetComponentesByPlanService implements IGetComponentesByPlanUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_plan: number): Promise<Componente[]> {
    return this.componenteRepository.getByPlan(id_plan);
  }
}
