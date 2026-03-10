import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { IGetLandingComponentesUseCase } from "../../Ports/ILandingComponenteUseCases";

export class GetLandingComponentesService implements IGetLandingComponentesUseCase {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_landing: number): Promise<LandingComponente[]> {
    return await this.landingComponenteRepository.getByLanding(id_landing);
  }
}
