import { UpdateLandingPageDTO } from "../../DTOs/LandingPage/UpdateLandingPageDTO";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class UpdateLandingPageService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(dto: UpdateLandingPageDTO): Promise<LandingPage> {
    return await this.landingPageRepository.update(dto as LandingPage);
  }
}
