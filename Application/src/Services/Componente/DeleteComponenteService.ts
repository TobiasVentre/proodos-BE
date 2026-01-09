import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";

export class DeleteComponenteService {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_componente: number): Promise<void> {
    await this.componenteRepository.delete(id_componente);
  }
}
