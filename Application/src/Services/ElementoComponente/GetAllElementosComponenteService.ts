import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IGetAllElementosComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllElementosComponenteService
  implements IGetAllElementosComponenteUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<ElementoComponente[]> {
    this.logger.info("[Service] GetAllElementosComponenteService.execute()");
    return this.elementoComponenteRepository.getAll();
  }
}
