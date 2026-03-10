import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { IPatchTipoVariacionDTO } from "../DTOs/TipoVariacion/IPatchTipoVariacionDTO";

export interface ITipoVariacionRepository {
  create(entity: TipoVariacion): Promise<TipoVariacion>;
  update(entity: TipoVariacion): Promise<TipoVariacion>;
  patch(id_tipo_variacion: number, dto: IPatchTipoVariacionDTO): Promise<TipoVariacion>;
  getById(id_tipo_variacion: number): Promise<TipoVariacion | null>;
  getAll(): Promise<TipoVariacion[]>;
  getByTipoComponente(id_tipo_componente: number): Promise<TipoVariacion[]>;
  delete(id_tipo_variacion: number): Promise<void>;
}
