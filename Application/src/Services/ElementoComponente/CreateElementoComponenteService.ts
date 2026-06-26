import { ICreateElementoComponenteDTO } from "../../DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { mapCreateElementoComponenteDTOToEntity } from "../../DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { ICreateElementoComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";
import { NotFoundError } from "../../Errors/NotFoundError";
import { ensureContratoMinimoDefinitionIsValid } from "./validateContratoMinimo";

export class CreateElementoComponenteService implements ICreateElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: ICreateElementoComponenteDTO): Promise<ElementoComponente> {
    this.logger.info("[Service] CreateElementoComponenteService.execute()");

    const tipoElementoExists = await this.tipoElementoRepository.exists(
      dto.id_tipo_elemento
    );
    if (!tipoElementoExists) {
      throw new NotFoundError("Tipo elemento not found");
    }

    ensureContratoMinimoDefinitionIsValid(dto.contrato_minimo);

    const componente = dto.id_componente
      ? await this.componenteRepository.getById(dto.id_componente)
      : null;
    if (dto.id_componente && !componente) {
      throw new NotFoundError("Componente not found");
    }

    const entity = mapCreateElementoComponenteDTOToEntity(dto);
    const created = await this.elementoComponenteRepository.create(entity);

    if (componente) {
      await this.elementoComponenteRepository.replaceAsignaciones(created.id_elemento, [
        {
          id_elemento_componente_variacion: 0,
          id_elemento: created.id_elemento,
          id_tipo_variacion: componente.id_tipo_variacion,
          id_componente: componente.id_componente,
          metadata: {},
        },
      ]);
    }

    return created;
  }
}
