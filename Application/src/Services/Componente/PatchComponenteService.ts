import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { PatchComponenteDTO } from "../../DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { PatchComponenteUseCase } from "../../Ports/ComponenteUseCases";

export class PatchComponenteService implements PatchComponenteUseCase {
  constructor(private readonly repo: IComponenteRepository) {}

  async execute(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    return this.repo.patch(id_componente, dto);
  }
}
