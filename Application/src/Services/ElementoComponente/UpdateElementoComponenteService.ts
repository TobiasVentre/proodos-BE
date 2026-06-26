import { IUpdateElementoComponenteDTO } from "../../DTOs/ElementoComponente/IUpdateElementoComponenteDTO";
import { mapUpdateElementoComponenteDTOToEntity } from "../../DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IUpdateElementoComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { NotFoundError } from "../../Errors/NotFoundError";
import { ensureContratoMinimoDefinitionIsValid } from "./validateContratoMinimo";

export class UpdateElementoComponenteService implements IUpdateElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository
  ) {}

  async execute(dto: IUpdateElementoComponenteDTO): Promise<ElementoComponente> {
    const tipoElementoExists = await this.tipoElementoRepository.exists(
      dto.id_tipo_elemento
    );
    if (!tipoElementoExists) {
      throw new NotFoundError("Tipo elemento not found");
    }

    ensureContratoMinimoDefinitionIsValid(dto.contrato_minimo);

    const entity = mapUpdateElementoComponenteDTOToEntity(dto);
    return this.elementoComponenteRepository.update(entity);
  }
}
