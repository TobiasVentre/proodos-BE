import { IUpdateElementoComponenteDTO } from "../../DTOs/ElementoComponente/IUpdateElementoComponenteDTO";
import { mapUpdateElementoComponenteDTOToEntity } from "../../DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { IUpdateElementoComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { NotFoundError } from "../../Errors/NotFoundError";

export class UpdateElementoComponenteService implements IUpdateElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository
  ) {}

  async execute(dto: IUpdateElementoComponenteDTO): Promise<ElementoComponente> {
    const componente = await this.componenteRepository.getById(dto.id_componente);
    if (!componente) {
      throw new NotFoundError("Componente not found");
    }

    const tipoElementoExists = await this.tipoElementoRepository.exists(
      dto.id_tipo_elemento
    );
    if (!tipoElementoExists) {
      throw new NotFoundError("Tipo elemento not found");
    }

    const entity = mapUpdateElementoComponenteDTOToEntity(dto);
    return this.elementoComponenteRepository.update(entity);
  }
}
