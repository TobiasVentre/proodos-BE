import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IGetVariacionesByTipoComponenteUseCase } from "../../Ports/ITipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ILogger } from "../../Interfaces/ILogger";

export class GetVariacionesByTipoComponenteService
  implements IGetVariacionesByTipoComponenteUseCase
{
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_tipo_componente: number): Promise<TipoVariacion[]> {
    this.logger.info("[Service] GetVariacionesByTipoComponenteService.execute()", {
      id_tipo_componente,
    });
    return this.tipoVariacionRepository.getByTipoComponente(id_tipo_componente);
  }
}
