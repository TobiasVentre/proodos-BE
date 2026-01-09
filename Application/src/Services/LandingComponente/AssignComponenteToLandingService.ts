import { AssignComponenteToLandingDTO } from "../../DTOs/LandingComponente/AssignComponenteToLandingDTO";
import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export class AssignComponenteToLandingService {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(dto: AssignComponenteToLandingDTO): Promise<LandingComponente> {
    return await this.landingComponenteRepository.assign(dto as LandingComponente);
  }
}
