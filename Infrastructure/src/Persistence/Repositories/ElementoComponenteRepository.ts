import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { IElementoComponenteRepository } from "@proodos/application/Interfaces/IElementoComponenteRepository";
import { PatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/PatchElementoComponenteDTO";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ElementoComponenteCommandRepository } from "./Commands/ElementoComponenteCommandRepository";
import { ElementoComponenteQueryRepository } from "./Queries/ElementoComponenteQueryRepository";

export class ElementoComponenteRepository implements IElementoComponenteRepository {
  private readonly commandRepository: ElementoComponenteCommandRepository;
  private readonly queryRepository: ElementoComponenteQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new ElementoComponenteCommandRepository(logger);
    this.queryRepository = new ElementoComponenteQueryRepository(logger);
  }

  async create(entity: ElementoComponente): Promise<ElementoComponente> {
    return this.commandRepository.create(entity);
  }

  async update(entity: ElementoComponente): Promise<ElementoComponente> {
    return this.commandRepository.update(entity);
  }

  async patch(
    id_elemento: number,
    dto: PatchElementoComponenteDTO
  ): Promise<ElementoComponente> {
    return this.commandRepository.patch(id_elemento, dto);
  }

  async getById(id_elemento: number): Promise<ElementoComponente | null> {
    return this.queryRepository.getById(id_elemento);
  }

  async getAll(): Promise<ElementoComponente[]> {
    return this.queryRepository.getAll();
  }

  async getByComponente(id_componente: number): Promise<ElementoComponente[]> {
    return this.queryRepository.getByComponente(id_componente);
  }

  async delete(id_elemento: number): Promise<void> {
    return this.commandRepository.delete(id_elemento);
  }
}
