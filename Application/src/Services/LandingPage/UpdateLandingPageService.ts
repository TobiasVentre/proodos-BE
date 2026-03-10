import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { IUpdateLandingPageDTO } from "../../DTOs/LandingPage/IUpdateLandingPageDTO";
import { mapUpdateLandingPageDTOToEntity } from "../../DTOs/LandingPage/LandingPageDTOMapper";
import { IUpdateLandingPageUseCase } from "../../Ports/ILandingPageUseCases";

export class UpdateLandingPageService implements IUpdateLandingPageUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(dto: IUpdateLandingPageDTO): Promise<LandingPage> {
    const entity = mapUpdateLandingPageDTOToEntity(dto);
    return this.landingPageRepository.update(entity);
  }
}
