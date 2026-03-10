import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { IGetLandingPageByIdUseCase } from "../../Ports/ILandingPageUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class GetLandingPageByIdService implements IGetLandingPageByIdUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_landing: number): Promise<LandingPage | null> {
    this.logger.info("[Service] GetLandingPageByIdService.execute()", { id_landing });
    return await this.landingPageRepository.getById(id_landing);
  }
}
