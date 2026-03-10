import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ICreateTipoVariacionDTO } from "../DTOs/TipoVariacion/ICreateTipoVariacionDTO";
import { IPatchTipoVariacionDTO } from "../DTOs/TipoVariacion/IPatchTipoVariacionDTO";
import { IUpdateTipoVariacionDTO } from "../DTOs/TipoVariacion/IUpdateTipoVariacionDTO";

export interface ICreateTipoVariacionUseCase {
  execute(dto: ICreateTipoVariacionDTO): Promise<TipoVariacion>;
}

export interface IGetAllTiposVariacionUseCase {
  execute(): Promise<TipoVariacion[]>;
}

export interface IGetTipoVariacionByIdUseCase {
  execute(id_tipo_variacion: number): Promise<TipoVariacion | null>;
}

export interface IGetVariacionesByTipoComponenteUseCase {
  execute(id_tipo_componente: number): Promise<TipoVariacion[]>;
}

export interface IUpdateTipoVariacionUseCase {
  execute(dto: IUpdateTipoVariacionDTO): Promise<TipoVariacion>;
}

export interface IPatchTipoVariacionUseCase {
  execute(
    id_tipo_variacion: number,
    dto: IPatchTipoVariacionDTO
  ): Promise<TipoVariacion>;
}

export interface IDeleteTipoVariacionUseCase {
  execute(id_tipo_variacion: number): Promise<void>;
}
