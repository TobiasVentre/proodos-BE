import { ICreateComponenteDTO } from "../DTOs/Componente/ICreateComponenteDTO";
import { IAssignComponenteHijoResult } from "../DTOs/Componente/IAssignComponenteHijoResult";
import { IComponenteHijoDTO } from "../DTOs/Componente/IComponenteHijoDTO";
import { IPatchComponenteDTO } from "../DTOs/Componente/IPatchComponenteDTO";
import { IUpdateComponenteDTO } from "../DTOs/Componente/IUpdateComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";

export interface ICreateComponenteUseCase {
  execute(dto: ICreateComponenteDTO): Promise<Componente>;
}

export interface IGetAllComponentesUseCase {
  execute(): Promise<Componente[]>;
}

export interface IGetComponenteByIdUseCase {
  execute(id_componente: number): Promise<Componente | null>;
}

export interface IUpdateComponenteUseCase {
  execute(dto: IUpdateComponenteDTO): Promise<Componente>;
}

export interface IPatchComponenteUseCase {
  execute(id_componente: number, dto: IPatchComponenteDTO): Promise<Componente>;
}

export interface IDeleteComponenteUseCase {
  execute(id_componente: number): Promise<void>;
}

export interface ISoftDeleteComponenteUseCase {
  execute(id_componente: number): Promise<void>;
}

export interface IGetComponentesByPlanUseCase {
  execute(id_plan: number): Promise<Componente[]>;
}

export interface IComponenteTreeNode extends Componente {
  hijos: IComponenteTreeNode[];
}

export interface IAssignComponenteHijoUseCase {
  execute(dto: IComponenteHijoDTO): Promise<IAssignComponenteHijoResult>;
}

export interface IUnassignComponenteHijoUseCase {
  execute(dto: IComponenteHijoDTO): Promise<void>;
}

export interface IGetComponenteTreeUseCase {
  execute(id_padre: number): Promise<IComponenteTreeNode>;
}

export interface IAssignPlanToComponenteUseCase {
  execute(id_componente: number, id_plan: number): Promise<Componente>;
}

export interface IUnassignPlanFromComponenteUseCase {
  execute(id_componente: number): Promise<Componente>;
}
