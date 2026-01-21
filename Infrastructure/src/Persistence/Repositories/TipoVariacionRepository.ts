import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ITipoVariacionRepository } from "@proodos/application/Interfaces/ITipoVariacionRepository";
import { PatchTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { TipoVariacionCommandRepository } from "./Commands/TipoVariacionCommandRepository";
import { TipoVariacionQueryRepository } from "./Queries/TipoVariacionQueryRepository";

export class TipoVariacionRepository implements ITipoVariacionRepository {
  private readonly commandRepository: TipoVariacionCommandRepository;
  private readonly queryRepository: TipoVariacionQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new TipoVariacionCommandRepository(logger);
    this.queryRepository = new TipoVariacionQueryRepository(logger);
  }

  async create(entity: TipoVariacion): Promise<TipoVariacion> {
    return this.commandRepository.create(entity);
  }

  async update(entity: TipoVariacion): Promise<TipoVariacion> {
    return this.commandRepository.update(entity);
  }

  async patch(
    id_tipo_variacion: number,
    dto: PatchTipoVariacionDTO
  ): Promise<TipoVariacion> {
    return this.commandRepository.patch(id_tipo_variacion, dto);
  }

  async getById(id_tipo_variacion: number): Promise<TipoVariacion | null> {
    return this.queryRepository.getById(id_tipo_variacion);
  }

  async getAll(): Promise<TipoVariacion[]> {
    return this.queryRepository.getAll();
  }

  async getByTipoComponente(id_tipo_componente: number): Promise<TipoVariacion[]> {
    return this.queryRepository.getByTipoComponente(id_tipo_componente);
  }
}
