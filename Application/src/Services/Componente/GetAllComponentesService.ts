import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";

export class GetAllComponentesService {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(): Promise<Componente[]> {
    return await this.componenteRepository.getAll();
  }
}
