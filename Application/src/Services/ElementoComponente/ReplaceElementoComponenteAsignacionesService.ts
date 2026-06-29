import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IReplaceElementoComponenteAsignacionesDTO } from "../../DTOs/ElementoComponente/IReplaceElementoComponenteAsignacionesDTO";
import { ValidationError } from "../../Errors/ValidationError";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IReplaceElementoComponenteAsignacionesUseCase } from "../../Ports/IElementoComponenteUseCases";
import { validateElementoComponenteAsignacion } from "./validateElementoComponenteAsignacion";

export class ReplaceElementoComponenteAsignacionesService
  implements IReplaceElementoComponenteAsignacionesUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(
    id_elemento: number,
    dto: IReplaceElementoComponenteAsignacionesDTO
  ): Promise<ElementoComponenteVariacion[]> {
    this.logger.info("[Service] ReplaceElementoComponenteAsignacionesService.execute()", {
      id_elemento,
    });

    if (!Array.isArray(dto.asignaciones)) {
      throw new ValidationError("VALIDATION_ERROR", "asignaciones must be an array");
    }

    const globalKeys = new Set<string>();
    const specificKeys = new Set<string>();
    const asignaciones: ElementoComponenteVariacion[] = [];

    for (const asignacion of dto.asignaciones) {
      const validated = await validateElementoComponenteAsignacion({
        id_elemento,
        dto: asignacion,
        elementoComponenteRepository: this.elementoComponenteRepository,
        tipoVariacionRepository: this.tipoVariacionRepository,
        componenteRepository: this.componenteRepository,
      });

      if (validated.id_componente === null) {
        const key = `${id_elemento}:${validated.id_tipo_variacion}`;
        if (globalKeys.has(key)) {
          throw new ValidationError("VALIDATION_ERROR", "Duplicated global asignacion");
        }
        globalKeys.add(key);
      } else {
        const key = `${id_elemento}:${validated.id_tipo_variacion}:${validated.id_componente}`;
        if (specificKeys.has(key)) {
          throw new ValidationError("VALIDATION_ERROR", "Duplicated specific asignacion");
        }
        specificKeys.add(key);
      }

      asignaciones.push(validated);
    }

    return this.elementoComponenteRepository.replaceAsignaciones(
      id_elemento,
      asignaciones
    );
  }
}
