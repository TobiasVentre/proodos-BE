import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ITipoComponenteRepository } from "@proodos/application/Interfaces/ITipoComponenteRepository";
import { PatchTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/PatchTipoComponenteDTO";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { TipoComponenteCommandRepository } from "./Commands/TipoComponenteCommandRepository";
import { TipoComponenteQueryRepository } from "./Queries/TipoComponenteQueryRepository";

export class TipoComponenteRepository implements ITipoComponenteRepository {
  private readonly commandRepository: TipoComponenteCommandRepository;
  private readonly queryRepository: TipoComponenteQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new TipoComponenteCommandRepository(logger);
    this.queryRepository = new TipoComponenteQueryRepository(logger);
  }

  async create(entity: TipoComponente): Promise<TipoComponente> {
    return this.commandRepository.create(entity);
  }

  async update(entity: TipoComponente): Promise<TipoComponente> {
    return this.commandRepository.update(entity);
  }

  async patch(
    id_tipo_componente: number,
    dto: PatchTipoComponenteDTO
  ): Promise<TipoComponente> {
    return this.commandRepository.patch(id_tipo_componente, dto);
  }

  async getById(id_tipo_componente: number): Promise<TipoComponente | null> {
    return this.queryRepository.getById(id_tipo_componente);
  }

  async getAll(): Promise<TipoComponente[]> {
    return this.queryRepository.getAll();
  }

  async exists(id_tipo_componente: number): Promise<boolean> {
    return this.queryRepository.exists(id_tipo_componente);
  }

  async delete(id_tipo_componente: number): Promise<void> {
    return this.commandRepository.delete(id_tipo_componente);
  }
}
