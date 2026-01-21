import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { PatchElementoComponenteUseCase } from "../../Ports/ElementoComponenteUseCases";
import { PatchElementoComponenteDTO } from "../../DTOs/ElementoComponente/PatchElementoComponenteDTO";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { NotFoundError } from "../../Errors/NotFoundError";

export class PatchElementoComponenteService implements PatchElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository
  ) {}

  async execute(
    id_elemento: number,
    dto: PatchElementoComponenteDTO
  ): Promise<ElementoComponente> {
    if (dto.id_componente !== undefined) {
      const componente = await this.componenteRepository.getById(dto.id_componente);
      if (!componente) {
        throw new NotFoundError("Componente not found");
      }
    }

    if (dto.id_tipo_elemento !== undefined) {
      const tipoElementoExists = await this.tipoElementoRepository.exists(
        dto.id_tipo_elemento
      );
      if (!tipoElementoExists) {
        throw new NotFoundError("Tipo elemento not found");
      }
    }

    return this.elementoComponenteRepository.patch(id_elemento, dto);
  }
}
