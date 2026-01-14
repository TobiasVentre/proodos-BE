import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class GetAllLandingPagesService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(): Promise<LandingPage[]> {
    console.log("[Service] GetAllLandingPagesService.execute()")
    return await this.landingPageRepository.getAll();
  }
}
