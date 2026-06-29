import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { IPatchElementoComponenteDTO } from "../DTOs/ElementoComponente/IPatchElementoComponenteDTO";

export interface IElementoComponenteRepository {
  create(entity: ElementoComponente): Promise<ElementoComponente>;
  update(entity: ElementoComponente): Promise<ElementoComponente>;
  patch(id_elemento: number, dto: IPatchElementoComponenteDTO): Promise<ElementoComponente>;
  getById(id_elemento: number): Promise<ElementoComponente | null>;
  getAll(): Promise<ElementoComponente[]>;
  getByComponente(id_componente: number): Promise<ElementoComponente[]>;
  getAsignacionesByElemento(id_elemento: number): Promise<ElementoComponenteVariacion[]>;
  replaceAsignaciones(
    id_elemento: number,
    asignaciones: ElementoComponenteVariacion[]
  ): Promise<ElementoComponenteVariacion[]>;
  upsertAsignacion(
    asignacion: ElementoComponenteVariacion
  ): Promise<ElementoComponenteVariacion>;
  deleteAsignacion(
    id_elemento: number,
    id_tipo_variacion: number,
    id_componente: number | null
  ): Promise<void>;
  delete(id_elemento: number): Promise<void>;
}
