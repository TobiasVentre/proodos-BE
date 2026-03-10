import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IDeleteTipoVariacionUseCase } from "../../Ports/ITipoVariacionUseCases";

export class DeleteTipoVariacionService implements IDeleteTipoVariacionUseCase {
  constructor(private readonly tipoVariacionRepository: ITipoVariacionRepository) {}

  async execute(id_tipo_variacion: number): Promise<void> {
    await this.tipoVariacionRepository.delete(id_tipo_variacion);
  }
}
