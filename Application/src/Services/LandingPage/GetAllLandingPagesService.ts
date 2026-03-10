import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { IGetAllLandingPagesUseCase } from "../../Ports/ILandingPageUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllLandingPagesService implements IGetAllLandingPagesUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<LandingPage[]> {
    this.logger.info("[Service] GetAllLandingPagesService.execute()");
    return await this.landingPageRepository.getAll();
  }
}
