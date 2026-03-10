import { IUpdateTipoElementoDTO } from "../../DTOs/TipoElemento/IUpdateTipoElementoDTO";
import { mapUpdateTipoElementoDTOToEntity } from "../../DTOs/TipoElemento/TipoElementoDTOMapper";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IUpdateTipoElementoUseCase } from "../../Ports/ITipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";

export class UpdateTipoElementoService implements IUpdateTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(dto: IUpdateTipoElementoDTO): Promise<TipoElemento> {
    const entity = mapUpdateTipoElementoDTOToEntity(dto);
    return this.tipoElementoRepository.update(entity);
  }
}
