import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ICreateTipoComponenteDTO } from "../DTOs/TipoComponente/ICreateTipoComponenteDTO";
import { IPatchTipoComponenteDTO } from "../DTOs/TipoComponente/IPatchTipoComponenteDTO";
import { IUpdateTipoComponenteDTO } from "../DTOs/TipoComponente/IUpdateTipoComponenteDTO";

export interface ICreateTipoComponenteUseCase {
  execute(dto: ICreateTipoComponenteDTO): Promise<TipoComponente>;
}

export interface IGetAllTiposComponenteUseCase {
  execute(): Promise<TipoComponente[]>;
}

export interface IGetTipoComponenteByIdUseCase {
  execute(id_tipo_componente: number): Promise<TipoComponente | null>;
}

export interface IUpdateTipoComponenteUseCase {
  execute(dto: IUpdateTipoComponenteDTO): Promise<TipoComponente>;
}

export interface IPatchTipoComponenteUseCase {
  execute(
    id_tipo_componente: number,
    dto: IPatchTipoComponenteDTO
  ): Promise<TipoComponente>;
}

export interface IDeleteTipoComponenteUseCase {
  execute(id_tipo_componente: number): Promise<void>;
}
