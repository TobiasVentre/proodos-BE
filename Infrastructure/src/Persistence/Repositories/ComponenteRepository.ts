import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PatchComponenteDTO } from "@proodos/application/DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { ComponenteCommandRepository } from "./Commands/ComponenteCommandRepository";
import { ComponenteQueryRepository } from "./Queries/ComponenteQueryRepository";

export class ComponenteRepository implements IComponenteRepository {
  private readonly commandRepository: ComponenteCommandRepository;
  private readonly queryRepository: ComponenteQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new ComponenteCommandRepository(logger);
    this.queryRepository = new ComponenteQueryRepository(logger);
  }

  async create(entity: Componente): Promise<Componente> {
    return this.commandRepository.create(entity);
  }

  async update(entity: Componente): Promise<Componente> {
    return this.commandRepository.update(entity);
  }

  async patch(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    return this.commandRepository.patch(id_componente, dto);
}

  async delete(id_componente: number): Promise<void> {
    return this.commandRepository.delete(id_componente);
  }

  async softDelete(id_componente: number, fecha_baja: Date, estado: string): Promise<void> {
    return this.commandRepository.softDelete(id_componente, fecha_baja, estado);
  }

  async getById(id: number): Promise<Componente | null> {
    return this.queryRepository.getById(id);
  }

  async getAll(): Promise<Componente[]> {
    return this.queryRepository.getAll();
  }

  async getByPlan(id_plan: number): Promise<Componente[]> {
    return this.queryRepository.getByPlan(id_plan);
  }
}
