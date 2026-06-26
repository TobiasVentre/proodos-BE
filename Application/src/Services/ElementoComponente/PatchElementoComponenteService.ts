import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IPatchElementoComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { IPatchElementoComponenteDTO } from "../../DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { NotFoundError } from "../../Errors/NotFoundError";
import { ensureContratoMinimoDefinitionIsValid } from "./validateContratoMinimo";

export class PatchElementoComponenteService implements IPatchElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository
  ) {}

  async execute(
    id_elemento: number,
    dto: IPatchElementoComponenteDTO
  ): Promise<ElementoComponente> {
    if (dto.id_tipo_elemento !== undefined) {
      const tipoElementoExists = await this.tipoElementoRepository.exists(
        dto.id_tipo_elemento
      );
      if (!tipoElementoExists) {
        throw new NotFoundError("Tipo elemento not found");
      }
    }

    if (dto.contrato_minimo !== undefined) {
      ensureContratoMinimoDefinitionIsValid(dto.contrato_minimo);
    }

    return this.elementoComponenteRepository.patch(id_elemento, dto);
  }
}
