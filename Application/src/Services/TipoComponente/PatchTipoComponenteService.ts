import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IPatchTipoComponenteUseCase } from "../../Ports/ITipoComponenteUseCases";
import { IPatchTipoComponenteDTO } from "../../DTOs/TipoComponente/IPatchTipoComponenteDTO";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";

export class PatchTipoComponenteService implements IPatchTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(
    id_tipo_componente: number,
    dto: IPatchTipoComponenteDTO
  ): Promise<TipoComponente> {
    return this.tipoComponenteRepository.patch(id_tipo_componente, dto);
  }
}
