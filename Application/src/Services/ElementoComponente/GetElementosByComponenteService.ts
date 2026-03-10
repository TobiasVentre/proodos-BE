import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IGetElementosByComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetElementosByComponenteService
  implements IGetElementosByComponenteUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_componente: number): Promise<ElementoComponente[]> {
    this.logger.info("[Service] GetElementosByComponenteService.execute()", {
      id_componente,
    });
    return this.elementoComponenteRepository.getByComponente(id_componente);
  }
}
