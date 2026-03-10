import { ICreateLandingPageDTO } from "../DTOs/LandingPage/ICreateLandingPageDTO";
import { IPatchLandingPageDTO } from "../DTOs/LandingPage/IPatchLandingPageDTO";
import { IUpdateLandingPageDTO } from "../DTOs/LandingPage/IUpdateLandingPageDTO";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export interface ICreateLandingPageUseCase {
  execute(dto: ICreateLandingPageDTO): Promise<LandingPage>;
}

export interface IGetAllLandingPagesUseCase {
  execute(): Promise<LandingPage[]>;
}

export interface IGetLandingPageByIdUseCase {
  execute(id_landing: number): Promise<LandingPage | null>;
}

export interface IUpdateLandingPageUseCase {
  execute(dto: IUpdateLandingPageDTO): Promise<LandingPage>;
}

export interface IPatchLandingPageUseCase {
  execute(id_landing: number, dto: IPatchLandingPageDTO): Promise<LandingPage>;
}

export interface IDeleteLandingPageUseCase {
  execute(id_landing: number): Promise<void>;
}
