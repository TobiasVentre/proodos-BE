import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class GetLandingPageByIdService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number): Promise<LandingPage | null> {
    return await this.landingPageRepository.getById(id_landing);
  }
}
