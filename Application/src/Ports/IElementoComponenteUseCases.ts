import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ICreateElementoComponenteDTO } from "../DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IPatchElementoComponenteDTO } from "../DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "../DTOs/ElementoComponente/IUpdateElementoComponenteDTO";

export interface ICreateElementoComponenteUseCase {
  execute(dto: ICreateElementoComponenteDTO): Promise<ElementoComponente>;
}

export interface IGetAllElementosComponenteUseCase {
  execute(): Promise<ElementoComponente[]>;
}

export interface IGetElementoComponenteByIdUseCase {
  execute(id_elemento: number): Promise<ElementoComponente | null>;
}

export interface IGetElementosByComponenteUseCase {
  execute(id_componente: number): Promise<ElementoComponente[]>;
}

export interface IUpdateElementoComponenteUseCase {
  execute(dto: IUpdateElementoComponenteDTO): Promise<ElementoComponente>;
}

export interface IPatchElementoComponenteUseCase {
  execute(
    id_elemento: number,
    dto: IPatchElementoComponenteDTO
  ): Promise<ElementoComponente>;
}

export interface IDeleteElementoComponenteUseCase {
  execute(id_elemento: number): Promise<void>;
}
