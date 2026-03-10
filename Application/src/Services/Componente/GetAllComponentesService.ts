import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IGetAllComponentesUseCase } from "../../Ports/IComponenteUseCases";

export class GetAllComponentesService implements IGetAllComponentesUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(): Promise<Componente[]> {
    return await this.componenteRepository.getAll();
  }
}
