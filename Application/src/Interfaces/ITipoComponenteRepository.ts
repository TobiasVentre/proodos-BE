import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { IPatchTipoComponenteDTO } from "../DTOs/TipoComponente/IPatchTipoComponenteDTO";

export interface ITipoComponenteRepository {
  create(entity: TipoComponente): Promise<TipoComponente>;
  update(entity: TipoComponente): Promise<TipoComponente>;
  patch(id_tipo_componente: number, dto: IPatchTipoComponenteDTO): Promise<TipoComponente>;
  getById(id_tipo_componente: number): Promise<TipoComponente | null>;
  getAll(): Promise<TipoComponente[]>;
  exists(id_tipo_componente: number): Promise<boolean>;
  delete(id_tipo_componente: number): Promise<void>;
}
