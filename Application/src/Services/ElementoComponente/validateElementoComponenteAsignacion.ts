import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IElementoComponenteAsignacionDTO } from "../../DTOs/ElementoComponente/IElementoComponenteAsignacionDTO";
import { NotFoundError } from "../../Errors/NotFoundError";
import { ValidationError } from "../../Errors/ValidationError";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ensureMetadataMatchesContratoMinimo } from "./validateContratoMinimo";

const normalizePositiveInteger = (value: unknown, fieldName: string): number => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new ValidationError("VALIDATION_ERROR", `Invalid ${fieldName}`);
  }

  return parsed;
};

const normalizeNullablePositiveInteger = (value: unknown, fieldName: string): number | null => {
  if (value === null || value === undefined || value === "") return null;
  return normalizePositiveInteger(value, fieldName);
};

const normalizeMetadata = (
  metadata: Record<string, unknown> | null | undefined,
  requireMetadata: boolean
): Record<string, unknown> => {
  if (metadata === null || metadata === undefined) {
    if (requireMetadata) {
      throw new ValidationError("VALIDATION_ERROR", "metadata is required");
    }

    return {};
  }

  if (typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new ValidationError("VALIDATION_ERROR", "metadata must be an object");
  }

  return metadata;
};

type ValidateAsignacionParams = {
  id_elemento: number;
  dto: IElementoComponenteAsignacionDTO;
  elementoComponenteRepository: IElementoComponenteRepository;
  tipoVariacionRepository: ITipoVariacionRepository;
  componenteRepository: IComponenteRepository;
  requireMetadata?: boolean;
};

export const validateElementoComponenteAsignacion = async ({
  id_elemento,
  dto,
  elementoComponenteRepository,
  tipoVariacionRepository,
  componenteRepository,
  requireMetadata = false,
}: ValidateAsignacionParams): Promise<ElementoComponenteVariacion> => {
  const elemento = await elementoComponenteRepository.getById(id_elemento);
  if (!elemento) {
    throw new NotFoundError("Elemento componente not found");
  }

  const idTipoVariacion = normalizePositiveInteger(
    dto.id_tipo_variacion,
    "id_tipo_variacion"
  );
  const tipoVariacion = await tipoVariacionRepository.getById(idTipoVariacion);
  if (!tipoVariacion) {
    throw new NotFoundError("Tipo variacion not found");
  }

  const idComponente = normalizeNullablePositiveInteger(
    dto.id_componente,
    "id_componente"
  );
  if (idComponente !== null) {
    const componente = await componenteRepository.getById(idComponente);
    if (!componente) {
      throw new NotFoundError("Componente not found");
    }

    if (componente.id_tipo_variacion !== idTipoVariacion) {
      throw new ValidationError(
        "VALIDATION_ERROR",
        "Componente does not belong to id_tipo_variacion"
      );
    }
  }

  const metadata = normalizeMetadata(dto.metadata, requireMetadata);
  ensureMetadataMatchesContratoMinimo(elemento.contrato_minimo, metadata);

  return {
    id_elemento_componente_variacion: 0,
    id_elemento,
    id_tipo_variacion: idTipoVariacion,
    id_componente: idComponente,
    metadata,
  };
};

export const normalizeElementoComponenteAsignacionKey = (
  dto: { id_tipo_variacion: unknown; id_componente?: unknown }
): { id_tipo_variacion: number; id_componente: number | null } => ({
  id_tipo_variacion: normalizePositiveInteger(dto.id_tipo_variacion, "id_tipo_variacion"),
  id_componente: normalizeNullablePositiveInteger(dto.id_componente, "id_componente"),
});
