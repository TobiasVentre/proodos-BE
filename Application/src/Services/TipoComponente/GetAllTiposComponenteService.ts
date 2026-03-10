import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IGetAllTiposComponenteUseCase } from "../../Ports/ITipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllTiposComponenteService implements IGetAllTiposComponenteUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<TipoComponente[]> {
    this.logger.info("[Service] GetAllTiposComponenteService.execute()");
    return this.tipoComponenteRepository.getAll();
  }
}
