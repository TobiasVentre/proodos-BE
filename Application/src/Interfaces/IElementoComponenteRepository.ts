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
  delete(id_elemento: number): Promise<void>;
}
