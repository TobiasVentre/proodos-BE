import { IComponenteCompuestoRepository } from "@proodos/application/Interfaces/IComponenteCompuestoRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";
import { ComponenteCompuestoCommandRepository } from "./Commands/ComponenteCompuestoCommandRepository";
import { ComponenteCompuestoQueryRepository } from "./Queries/ComponenteCompuestoQueryRepository";

export class ComponenteCompuestoRepository implements IComponenteCompuestoRepository {
  private readonly commandRepository: ComponenteCompuestoCommandRepository;
  private readonly queryRepository: ComponenteCompuestoQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new ComponenteCompuestoCommandRepository(logger);
    this.queryRepository = new ComponenteCompuestoQueryRepository(logger);
  }

  async assign(id_padre: number, id_hijo: number): Promise<{ created: boolean }> {
    return this.commandRepository.assign(id_padre, id_hijo);
  }

  async unassign(id_padre: number, id_hijo: number): Promise<void> {
    return this.commandRepository.unassign(id_padre, id_hijo);
  }

  async getAll(): Promise<ComponenteCompuesto[]> {
    return this.queryRepository.getAll();
  }
}
