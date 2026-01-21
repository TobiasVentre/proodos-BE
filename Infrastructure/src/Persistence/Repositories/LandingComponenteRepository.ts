import { ILandingComponenteRepository } from "@proodos/application/Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingComponenteCommandRepository } from "./Commands/LandingComponenteCommandRepository";
import { LandingComponenteQueryRepository } from "./Queries/LandingComponenteQueryRepository";

export class LandingComponenteRepository implements ILandingComponenteRepository {
  private readonly commandRepository: LandingComponenteCommandRepository;
  private readonly queryRepository: LandingComponenteQueryRepository;

  constructor() {
    this.commandRepository = new LandingComponenteCommandRepository();
    this.queryRepository = new LandingComponenteQueryRepository();
  }

  async assign(entity: LandingComponente): Promise<LandingComponente> {
    return this.commandRepository.assign(entity);
  }

  async unassign(id_landing: number, id_componente: number): Promise<void> {
    return this.commandRepository.unassign(id_landing, id_componente);
  }

  async getByLanding(id_landing: number): Promise<LandingComponente[]> {
    return this.queryRepository.getByLanding(id_landing);
  }

  async getByComponente(id_componente: number): Promise<LandingComponente[]> {
    return this.queryRepository.getByComponente(id_componente);
  }

  async exists(id_landing: number, id_componente: number): Promise<boolean> {
    return this.queryRepository.exists(id_landing, id_componente);
  }

  async existsByComponente(id_componente: number): Promise<boolean> {
    return this.queryRepository.existsByComponente(id_componente);
  }
}
