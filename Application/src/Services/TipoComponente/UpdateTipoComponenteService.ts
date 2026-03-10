import { IUpdateTipoComponenteDTO } from "../../DTOs/TipoComponente/IUpdateTipoComponenteDTO";
import { mapUpdateTipoComponenteDTOToEntity } from "../../DTOs/TipoComponente/TipoComponenteDTOMapper";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IUpdateTipoComponenteUseCase } from "../../Ports/ITipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";

export class UpdateTipoComponenteService implements IUpdateTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(dto: IUpdateTipoComponenteDTO): Promise<TipoComponente> {
    const entity = mapUpdateTipoComponenteDTOToEntity(dto);
    return this.tipoComponenteRepository.update(entity);
  }
}
