import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IGetTipoComponenteByIdUseCase } from "../../Ports/ITipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetTipoComponenteByIdService implements IGetTipoComponenteByIdUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_tipo_componente: number): Promise<TipoComponente | null> {
    this.logger.info("[Service] GetTipoComponenteByIdService.execute()", {
      id_tipo_componente,
    });
    return this.tipoComponenteRepository.getById(id_tipo_componente);
  }
}
