import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ICreateTipoElementoDTO } from "../DTOs/TipoElemento/ICreateTipoElementoDTO";
import { IPatchTipoElementoDTO } from "../DTOs/TipoElemento/IPatchTipoElementoDTO";
import { IUpdateTipoElementoDTO } from "../DTOs/TipoElemento/IUpdateTipoElementoDTO";

export interface ICreateTipoElementoUseCase {
  execute(dto: ICreateTipoElementoDTO): Promise<TipoElemento>;
}

export interface IGetAllTiposElementoUseCase {
  execute(): Promise<TipoElemento[]>;
}

export interface IGetTipoElementoByIdUseCase {
  execute(id_tipo_elemento: number): Promise<TipoElemento | null>;
}

export interface IUpdateTipoElementoUseCase {
  execute(dto: IUpdateTipoElementoDTO): Promise<TipoElemento>;
}

export interface IPatchTipoElementoUseCase {
  execute(
    id_tipo_elemento: number,
    dto: IPatchTipoElementoDTO
  ): Promise<TipoElemento>;
}

export interface IDeleteTipoElementoUseCase {
  execute(id_tipo_elemento: number): Promise<void>;
}
