import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { PatchTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/PatchTipoElementoDTO";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { TipoElementoCommandRepository } from "./Commands/TipoElementoCommandRepository";
import { TipoElementoQueryRepository } from "./Queries/TipoElementoQueryRepository";

export class TipoElementoRepository implements ITipoElementoRepository {
  private readonly commandRepository: TipoElementoCommandRepository;
  private readonly queryRepository: TipoElementoQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new TipoElementoCommandRepository(logger);
    this.queryRepository = new TipoElementoQueryRepository(logger);
  }

  async create(entity: TipoElemento): Promise<TipoElemento> {
    return this.commandRepository.create(entity);
  }

  async update(entity: TipoElemento): Promise<TipoElemento> {
    return this.commandRepository.update(entity);
  }

  async patch(
    id_tipo_elemento: number,
    dto: PatchTipoElementoDTO
  ): Promise<TipoElemento> {
    return this.commandRepository.patch(id_tipo_elemento, dto);
  }

  async getById(id_tipo_elemento: number): Promise<TipoElemento | null> {
    return this.queryRepository.getById(id_tipo_elemento);
  }

  async getAll(): Promise<TipoElemento[]> {
    return this.queryRepository.getAll();
  }

  async delete(id_tipo_elemento: number): Promise<void> {
    return this.commandRepository.delete(id_tipo_elemento);
  }

  async exists(id_tipo_elemento: number): Promise<boolean> {
    return this.queryRepository.exists(id_tipo_elemento);
  }
}
