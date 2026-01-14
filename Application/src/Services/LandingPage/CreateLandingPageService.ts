import { CreateLandingPageDTO } from "../../DTOs/LandingPage/CreateLandingPageDTO";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { CreateLandingPageUseCase } from "../../Ports/LandingPageUseCases";

export class CreateLandingPageService implements CreateLandingPageUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(dto: CreateLandingPageDTO): Promise<LandingPage> {
    console.log("[Service] CreateLandingPageService.execute()");
    return await this.landingPageRepository.create(dto as LandingPage);
  }
}
