import { IDeleteElementoComponenteAsignacionDTO } from "../../DTOs/ElementoComponente/IDeleteElementoComponenteAsignacionDTO";
import { NotFoundError } from "../../Errors/NotFoundError";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { IDeleteElementoComponenteAsignacionUseCase } from "../../Ports/IElementoComponenteUseCases";
import { normalizeElementoComponenteAsignacionKey } from "./validateElementoComponenteAsignacion";

export class DeleteElementoComponenteAsignacionService
  implements IDeleteElementoComponenteAsignacionUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(
    id_elemento: number,
    dto: IDeleteElementoComponenteAsignacionDTO
  ): Promise<void> {
    this.logger.info("[Service] DeleteElementoComponenteAsignacionService.execute()", {
      id_elemento,
    });

    const elemento = await this.elementoComponenteRepository.getById(id_elemento);
    if (!elemento) {
      throw new NotFoundError("Elemento componente not found");
    }

    const key = normalizeElementoComponenteAsignacionKey(dto);
    await this.elementoComponenteRepository.deleteAsignacion(
      id_elemento,
      key.id_tipo_variacion,
      key.id_componente
    );
  }
}
