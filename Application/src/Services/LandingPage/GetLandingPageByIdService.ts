import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { GetLandingPageByIdUseCase } from "../../Ports/LandingPageUseCases";

export class GetLandingPageByIdService implements GetLandingPageByIdUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number): Promise<LandingPage | null> {
    console.log("[Service] GetLandingPageByIdService.execute()", { id_landing });
    return await this.landingPageRepository.getById(id_landing);
  }
}
