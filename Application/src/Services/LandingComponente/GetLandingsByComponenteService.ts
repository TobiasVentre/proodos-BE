import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { IGetLandingsByComponenteUseCase } from "../../Ports/ILandingComponenteUseCases";

export class GetLandingsByComponenteService implements IGetLandingsByComponenteUseCase {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_componente: number): Promise<LandingComponente[]> {
    return await this.landingComponenteRepository.getByComponente(id_componente);
  }
}
