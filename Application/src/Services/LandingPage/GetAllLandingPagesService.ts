import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { GetAllLandingPagesUseCase } from "../../Ports/LandingPageUseCases";

export class GetAllLandingPagesService implements GetAllLandingPagesUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(): Promise<LandingPage[]> {
    console.log("[Service] GetAllLandingPagesService.execute()")
    return await this.landingPageRepository.getAll();
  }
}
