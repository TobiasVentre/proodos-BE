import { IComponenteHijoDTO } from "../../DTOs/Componente/IComponenteHijoDTO";
import { mapComponenteHijoDTOToEntity } from "../../DTOs/Componente/ComponenteHijoDTOMapper";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";
import { IUnassignComponenteHijoUseCase } from "../../Ports/IComponenteUseCases";

export class UnassignComponenteHijoService implements IUnassignComponenteHijoUseCase {
  constructor(private readonly compuestoRepository: IComponenteCompuestoRepository) {}

  async execute(dto: IComponenteHijoDTO): Promise<void> {
    const entity = mapComponenteHijoDTOToEntity(dto);
    await this.compuestoRepository.unassign(entity.id_padre, entity.id_hijo);
  }
}
