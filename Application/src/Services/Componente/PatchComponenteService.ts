import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { PatchComponenteDTO } from "../../DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { PatchComponenteUseCase } from "../../Ports/ComponenteUseCases";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ValidationError } from "../../Errors/ValidationError";

export class PatchComponenteService implements PatchComponenteUseCase {
  constructor(
    private readonly repo: IComponenteRepository,
    private readonly planRepository: IPlanRepository
  ) {}

  async execute(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    if (dto.id_plan !== undefined) {
      const planExists = await this.planRepository.exists(dto.id_plan);
      if (!planExists) {
        throw new ValidationError("IC-04", "Plan no existe");
      }
    }
    return this.repo.patch(id_componente, dto);
  }
}
