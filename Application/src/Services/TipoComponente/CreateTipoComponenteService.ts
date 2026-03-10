import { ICreateTipoComponenteDTO } from "../../DTOs/TipoComponente/ICreateTipoComponenteDTO";
import { mapCreateTipoComponenteDTOToEntity } from "../../DTOs/TipoComponente/TipoComponenteDTOMapper";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { ICreateTipoComponenteUseCase } from "../../Ports/ITipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateTipoComponenteService implements ICreateTipoComponenteUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreateTipoComponenteDTO): Promise<TipoComponente> {
    this.logger.info("[Service] CreateTipoComponenteService.execute()");
    const entity = mapCreateTipoComponenteDTOToEntity(dto);
    return this.tipoComponenteRepository.create(entity);
  }
}
