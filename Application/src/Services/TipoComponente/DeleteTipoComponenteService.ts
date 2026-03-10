import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IDeleteTipoComponenteUseCase } from "../../Ports/ITipoComponenteUseCases";

export class DeleteTipoComponenteService implements IDeleteTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(id_tipo_componente: number): Promise<void> {
    await this.tipoComponenteRepository.delete(id_tipo_componente);
  }
}
