import {
  buildAssignComponenteHijoResult,
  mapComponenteHijoDTOToEntity,
} from "../../DTOs/Componente/ComponenteHijoDTOMapper";
import { IAssignComponenteHijoResult } from "../../DTOs/Componente/IAssignComponenteHijoResult";
import { IComponenteHijoDTO } from "../../DTOs/Componente/IComponenteHijoDTO";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";
import { NotFoundError } from "../../Errors/NotFoundError";
import { IAssignComponenteHijoUseCase } from "../../Ports/IComponenteUseCases";

export class AssignComponenteHijoService implements IAssignComponenteHijoUseCase {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly compuestoRepository: IComponenteCompuestoRepository
  ) {}

  async execute(
    dto: IComponenteHijoDTO
  ): Promise<IAssignComponenteHijoResult> {
    const entity = mapComponenteHijoDTOToEntity(dto);

    const padre = await this.componenteRepository.getById(entity.id_padre);
    if (!padre) {
      throw new NotFoundError("Parent componente not found");
    }

    const hijo = await this.componenteRepository.getById(entity.id_hijo);
    if (!hijo) {
      throw new NotFoundError("Child componente not found");
    }

    const result = await this.compuestoRepository.assign(
      entity.id_padre,
      entity.id_hijo
    );

    return buildAssignComponenteHijoResult(entity, result.created);
  }
}
