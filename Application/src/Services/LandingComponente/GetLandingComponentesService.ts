import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IGetLandingComponentesUseCase } from "../../Ports/ILandingComponenteUseCases";

export class GetLandingComponentesService implements IGetLandingComponentesUseCase {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_landing: number): Promise<Componente[]> {
    const relations = await this.landingComponenteRepository.getByLanding(id_landing);

    return relations.filter(this.hasComponente).map((relation) => relation.componente);
  }

  private hasComponente(
    relation: LandingComponente
  ): relation is LandingComponente & { componente: Componente } {
    return Boolean(relation.componente);
  }
}
