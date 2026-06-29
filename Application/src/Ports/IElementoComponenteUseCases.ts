import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ElementoComponenteVariacion } from "@proodos/domain/Entities/ElementoComponenteVariacion";
import { ICreateElementoComponenteDTO } from "../DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IDeleteElementoComponenteAsignacionDTO } from "../DTOs/ElementoComponente/IDeleteElementoComponenteAsignacionDTO";
import { IElementoComponenteAsignacionDTO } from "../DTOs/ElementoComponente/IElementoComponenteAsignacionDTO";
import { IPatchElementoComponenteDTO } from "../DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { IReplaceElementoComponenteAsignacionesDTO } from "../DTOs/ElementoComponente/IReplaceElementoComponenteAsignacionesDTO";
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

export interface IGetElementoComponenteAsignacionesUseCase {
  execute(id_elemento: number): Promise<ElementoComponenteVariacion[]>;
}

export interface IReplaceElementoComponenteAsignacionesUseCase {
  execute(
    id_elemento: number,
    dto: IReplaceElementoComponenteAsignacionesDTO
  ): Promise<ElementoComponenteVariacion[]>;
}

export interface IUpsertElementoComponenteAsignacionUseCase {
  execute(
    id_elemento: number,
    dto: IElementoComponenteAsignacionDTO
  ): Promise<ElementoComponenteVariacion>;
}

export interface IDeleteElementoComponenteAsignacionUseCase {
  execute(
    id_elemento: number,
    dto: IDeleteElementoComponenteAsignacionDTO
  ): Promise<void>;
}
