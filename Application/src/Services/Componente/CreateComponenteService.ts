import { CreateComponenteDTO } from "../../DTOs/Componente/CreateComponenteDTO";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { CreateComponenteUseCase } from "../../Ports/ComponenteUseCases";

export class CreateComponenteService implements CreateComponenteUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(dto: CreateComponenteDTO): Promise<Componente> {
    console.log("[Service] CreateComponenteService.execute()");
    return await this.componenteRepository.create(dto as Componente);
  }
}
