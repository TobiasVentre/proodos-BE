import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ConflictError } from "../../Errors/ConflictError";
import { NotFoundError } from "../../Errors/NotFoundError";

export class SoftDeleteComponenteService {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly landingComponenteRepository: ILandingComponenteRepository
  ) {}

  async execute(id_componente: number): Promise<void> {
    const componente = await this.componenteRepository.getById(id_componente);

    if (!componente) {
      throw new NotFoundError("Componente not found");
    }

    const isAssigned = await this.landingComponenteRepository.existsByComponente(
      id_componente
    );

    if (isAssigned) {
      throw new ConflictError("Componente is assigned to a landing");
    }

    await this.componenteRepository.softDelete(
      id_componente,
      new Date(),
      "INACTIVO"
    );
  }
}
