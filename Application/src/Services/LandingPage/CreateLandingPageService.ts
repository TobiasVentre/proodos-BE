import { ICreateLandingPageDTO } from "../../DTOs/LandingPage/ICreateLandingPageDTO";
import { mapCreateLandingPageDTOToEntity } from "../../DTOs/LandingPage/LandingPageDTOMapper";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { ICreateLandingPageUseCase } from "../../Ports/ILandingPageUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateLandingPageService implements ICreateLandingPageUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreateLandingPageDTO): Promise<LandingPage> {
    this.logger.info("[Service] CreateLandingPageService.execute()");
    const entity = mapCreateLandingPageDTOToEntity(dto);
    return this.landingPageRepository.create(entity);
  }
}
