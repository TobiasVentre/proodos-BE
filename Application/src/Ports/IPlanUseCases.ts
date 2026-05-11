import { ICreatePlanDTO } from "../DTOs/Plan/ICreatePlanDTO";
import { ICreatePlanFullDTO } from "../DTOs/Plan/ICreatePlanFullDTO";
import { IPatchPlanDTO } from "../DTOs/Plan/IPatchPlanDTO";
import { IPatchPlanFullDTO } from "../DTOs/Plan/IPatchPlanFullDTO";
import { IUpdatePlanDTO } from "../DTOs/Plan/IUpdatePlanDTO";
import { IUpdatePlanFullDTO } from "../DTOs/Plan/IUpdatePlanFullDTO";
import { IPlanExportDataDTO } from "../DTOs/Plan/IPlanExportDataDTO";
import {
  IPublishPlanChangeDTO,
  IPublishPlansResultDTO,
} from "../DTOs/Plan/IPublishPlansDTO";
import { Plan } from "@proodos/domain/Entities/Plan";

export type PlansDataSnapshot = Record<string, IPlanExportDataDTO>;

export interface ICreatePlanUseCase {
  execute(dto: ICreatePlanDTO): Promise<Plan>;
}

export interface ICreatePlanFullUseCase {
  execute(dto: ICreatePlanFullDTO): Promise<Plan>;
}

export interface IGetAllPlansUseCase {
  execute(): Promise<Plan[]>;
}

export interface IGetPlansDataUseCase {
  execute(): Promise<PlansDataSnapshot>;
}

export interface IGetPlanByIdUseCase {
  execute(id_plan: number): Promise<Plan | null>;
}

export interface IUpdatePlanUseCase {
  execute(dto: IUpdatePlanDTO): Promise<Plan>;
}

export interface IUpdatePlanFullUseCase {
  execute(dto: IUpdatePlanFullDTO): Promise<Plan>;
}

export interface IPatchPlanUseCase {
  execute(id_plan: number, dto: IPatchPlanDTO): Promise<Plan>;
}

export interface IPatchPlanFullUseCase {
  execute(id_plan: number, dto: IPatchPlanFullDTO): Promise<Plan>;
}

export interface IDeletePlanUseCase {
  execute(id_plan: number): Promise<void>;
}

export interface IPublishPlansUseCase {
  execute(changes: IPublishPlanChangeDTO[]): Promise<IPublishPlansResultDTO>;
}
