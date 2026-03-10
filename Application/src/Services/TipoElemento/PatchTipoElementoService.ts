import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IPatchTipoElementoUseCase } from "../../Ports/ITipoElementoUseCases";
import { IPatchTipoElementoDTO } from "../../DTOs/TipoElemento/IPatchTipoElementoDTO";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";

export class PatchTipoElementoService implements IPatchTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(
    id_tipo_elemento: number,
    dto: IPatchTipoElementoDTO
  ): Promise<TipoElemento> {
    return this.tipoElementoRepository.patch(id_tipo_elemento, dto);
  }
}
