import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IReplaceElementoComponenteAsignacionesDTO } from "../../DTOs/ElementoComponente/IReplaceElementoComponenteAsignacionesDTO";
import { NotFoundError } from "../../Errors/NotFoundError";
import { ValidationError } from "../../Errors/ValidationError";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IReplaceElementoComponenteAsignacionesUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ensureMetadataMatchesContratoMinimo } from "./validateContratoMinimo";

const normalizeMetadata = (
  metadata: Record<string, unknown> | null | undefined
): Record<string, unknown> => {
  if (metadata === null || metadata === undefined) return {};
  if (typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new ValidationError("VALIDATION_ERROR", "metadata must be an object");
  }
  return metadata;
};

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

    const elemento = await this.elementoComponenteRepository.getById(id_elemento);
    if (!elemento) {
      throw new NotFoundError("Elemento componente not found");
    }

    if (!Array.isArray(dto.asignaciones)) {
      throw new ValidationError("VALIDATION_ERROR", "asignaciones must be an array");
    }

    const globalKeys = new Set<string>();
    const specificKeys = new Set<string>();
    const asignaciones: ElementoComponenteVariacion[] = [];

    for (const asignacion of dto.asignaciones) {
      if (!Number.isInteger(asignacion.id_tipo_variacion) || asignacion.id_tipo_variacion <= 0) {
        throw new ValidationError("VALIDATION_ERROR", "Invalid id_tipo_variacion");
      }

      const tipoVariacion = await this.tipoVariacionRepository.getById(
        asignacion.id_tipo_variacion
      );
      if (!tipoVariacion) {
        throw new NotFoundError("Tipo variacion not found");
      }

      const idComponente = asignacion.id_componente ?? null;
      if (idComponente !== null) {
        if (!Number.isInteger(idComponente) || idComponente <= 0) {
          throw new ValidationError("VALIDATION_ERROR", "Invalid id_componente");
        }

        const componente = await this.componenteRepository.getById(idComponente);
        if (!componente) {
          throw new NotFoundError("Componente not found");
        }

        if (componente.id_tipo_variacion !== asignacion.id_tipo_variacion) {
          throw new ValidationError(
            "VALIDATION_ERROR",
            "Componente does not belong to id_tipo_variacion"
          );
        }
      }

      const metadata = normalizeMetadata(asignacion.metadata);
      ensureMetadataMatchesContratoMinimo(elemento.contrato_minimo, metadata);

      if (idComponente === null) {
        const key = `${id_elemento}:${asignacion.id_tipo_variacion}`;
        if (globalKeys.has(key)) {
          throw new ValidationError("VALIDATION_ERROR", "Duplicated global asignacion");
        }
        globalKeys.add(key);
      } else {
        const key = `${id_elemento}:${asignacion.id_tipo_variacion}:${idComponente}`;
        if (specificKeys.has(key)) {
          throw new ValidationError("VALIDATION_ERROR", "Duplicated specific asignacion");
        }
        specificKeys.add(key);
      }

      asignaciones.push({
        id_elemento_componente_variacion: 0,
        id_elemento,
        id_tipo_variacion: asignacion.id_tipo_variacion,
        id_componente: idComponente,
        metadata,
      });
    }

    return this.elementoComponenteRepository.replaceAsignaciones(
      id_elemento,
      asignaciones
    );
  }
}
