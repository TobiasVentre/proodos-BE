import { IAssignLandingComponenteResult } from "../DTOs/LandingComponente/IAssignLandingComponenteResult";
import { ILandingComponenteDTO } from "../DTOs/LandingComponente/ILandingComponenteDTO";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { Componente } from "@proodos/domain/Entities/Componente";

export interface IAssignLandingComponenteUseCase {
  execute(dto: ILandingComponenteDTO): Promise<IAssignLandingComponenteResult>;
}

export interface IUnassignLandingComponenteUseCase {
  execute(dto: ILandingComponenteDTO): Promise<void>;
}

export interface IGetLandingComponentesUseCase {
  execute(id_landing: number): Promise<Componente[]>;
}

export interface IGetLandingsByComponenteUseCase {
  execute(id_componente: number): Promise<LandingComponente[]>;
}
