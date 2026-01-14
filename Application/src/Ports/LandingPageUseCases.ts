import { CreateLandingPageDTO } from "../DTOs/LandingPage/CreateLandingPageDTO";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export interface CreateLandingPageUseCase {
  execute(dto: CreateLandingPageDTO): Promise<LandingPage>;
}

export interface GetAllLandingPagesUseCase {
  execute(): Promise<LandingPage[]>;
}

export interface GetLandingPageByIdUseCase {
  execute(id_landing: number): Promise<LandingPage | null>;
}
