import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IGetComponenteByIdUseCase } from "../../Ports/IComponenteUseCases";

export class GetComponenteByIdService implements IGetComponenteByIdUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_componente: number): Promise<Componente | null> {
    return await this.componenteRepository.getById(id_componente);
  }
}
