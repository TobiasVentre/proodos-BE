import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IDeleteTipoElementoUseCase } from "../../Ports/ITipoElementoUseCases";

export class DeleteTipoElementoService implements IDeleteTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(id_tipo_elemento: number): Promise<void> {
    await this.tipoElementoRepository.delete(id_tipo_elemento);
  }
}
