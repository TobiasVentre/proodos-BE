import { ICreateTipoElementoDTO } from "../../DTOs/TipoElemento/ICreateTipoElementoDTO";
import { mapCreateTipoElementoDTOToEntity } from "../../DTOs/TipoElemento/TipoElementoDTOMapper";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { ICreateTipoElementoUseCase } from "../../Ports/ITipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateTipoElementoService implements ICreateTipoElementoUseCase {
  constructor(
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreateTipoElementoDTO): Promise<TipoElemento> {
    this.logger.info("[Service] CreateTipoElementoService.execute()");
    const entity = mapCreateTipoElementoDTOToEntity(dto);
    return this.tipoElementoRepository.create(entity);
  }
}
