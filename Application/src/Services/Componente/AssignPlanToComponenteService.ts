import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { AssignPlanToComponenteUseCase } from "../../Ports/ComponenteUseCases";
import { ensurePlanExists } from "./ensurePlanExists";

export class AssignPlanToComponenteService implements AssignPlanToComponenteUseCase {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly planRepository: IPlanRepository
  ) {}

  async execute(id_componente: number, id_plan: number): Promise<Componente> {
    await ensurePlanExists(this.planRepository, id_plan);
    return this.componenteRepository.patch(id_componente, { id_plan });
  }
}
