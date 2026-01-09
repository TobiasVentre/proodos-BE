import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class GetAllLandingPagesService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(): Promise<LandingPage[]> {
    return await this.landingPageRepository.getAll();
  }
}
