import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { DeleteTipoComponenteUseCase } from "../../Ports/TipoComponenteUseCases";

export class DeleteTipoComponenteService implements DeleteTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(id_tipo_componente: number): Promise<void> {
    await this.tipoComponenteRepository.delete(id_tipo_componente);
  }
}
