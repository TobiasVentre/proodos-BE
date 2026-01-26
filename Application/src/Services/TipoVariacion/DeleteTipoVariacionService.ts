import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { DeleteTipoVariacionUseCase } from "../../Ports/TipoVariacionUseCases";

export class DeleteTipoVariacionService implements DeleteTipoVariacionUseCase {
  constructor(private readonly tipoVariacionRepository: ITipoVariacionRepository) {}

  async execute(id_tipo_variacion: number): Promise<void> {
    await this.tipoVariacionRepository.delete(id_tipo_variacion);
  }
}
