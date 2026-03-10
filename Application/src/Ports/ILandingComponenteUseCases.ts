import { IAssignLandingComponenteResult } from "../DTOs/LandingComponente/IAssignLandingComponenteResult";
import { ILandingComponenteDTO } from "../DTOs/LandingComponente/ILandingComponenteDTO";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export interface IAssignLandingComponenteUseCase {
  execute(dto: ILandingComponenteDTO): Promise<IAssignLandingComponenteResult>;
}

export interface IUnassignLandingComponenteUseCase {
  execute(dto: ILandingComponenteDTO): Promise<void>;
}

export interface IGetLandingComponentesUseCase {
  execute(id_landing: number): Promise<LandingComponente[]>;
}

export interface IGetLandingsByComponenteUseCase {
  execute(id_componente: number): Promise<LandingComponente[]>;
}
