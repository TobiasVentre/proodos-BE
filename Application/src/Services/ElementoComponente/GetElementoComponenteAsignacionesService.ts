import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { IGetElementoComponenteAsignacionesUseCase } from "../../Ports/IElementoComponenteUseCases";

export class GetElementoComponenteAsignacionesService
  implements IGetElementoComponenteAsignacionesUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_elemento: number): Promise<ElementoComponenteVariacion[]> {
    this.logger.info("[Service] GetElementoComponenteAsignacionesService.execute()", {
      id_elemento,
    });
    return this.elementoComponenteRepository.getAsignacionesByElemento(id_elemento);
  }
}
