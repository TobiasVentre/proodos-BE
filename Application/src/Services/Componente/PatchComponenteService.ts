import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { PatchComponenteDTO } from "../../DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";

export class PatchComponenteService {
  constructor(private readonly repo: IComponenteRepository) {}

  async execute(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    return this.repo.patch(id_componente, dto);
  }
}