import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IElementoComponenteAsignacionDTO } from "../../DTOs/ElementoComponente/IElementoComponenteAsignacionDTO";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IUpsertElementoComponenteAsignacionUseCase } from "../../Ports/IElementoComponenteUseCases";
import { validateElementoComponenteAsignacion } from "./validateElementoComponenteAsignacion";

export class UpsertElementoComponenteAsignacionService
  implements IUpsertElementoComponenteAsignacionUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(
    id_elemento: number,
    dto: IElementoComponenteAsignacionDTO
  ): Promise<ElementoComponenteVariacion> {
    this.logger.info("[Service] UpsertElementoComponenteAsignacionService.execute()", {
      id_elemento,
    });

    const asignacion = await validateElementoComponenteAsignacion({
      id_elemento,
      dto,
      elementoComponenteRepository: this.elementoComponenteRepository,
      tipoVariacionRepository: this.tipoVariacionRepository,
      componenteRepository: this.componenteRepository,
      requireMetadata: true,
    });

    return this.elementoComponenteRepository.upsertAsignacion(asignacion);
  }
}
