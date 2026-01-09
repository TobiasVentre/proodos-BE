import { CreateLandingPageDTO } from "../../DTOs/LandingPage/CreateLandingPageDTO";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class CreateLandingPageService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(dto: CreateLandingPageDTO): Promise<LandingPage> {
    return await this.landingPageRepository.create(dto as LandingPage);
  }
}
