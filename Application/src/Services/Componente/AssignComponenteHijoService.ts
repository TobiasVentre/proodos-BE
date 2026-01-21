import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";
import { NotFoundError } from "../../Errors/NotFoundError";

export class AssignComponenteHijoService {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly compuestoRepository: IComponenteCompuestoRepository
  ) {}

  async execute(id_padre: number, id_hijo: number): Promise<{ created: boolean }> {
    const padre = await this.componenteRepository.getById(id_padre);
    if (!padre) {
      throw new NotFoundError("Parent componente not found");
    }

    const hijo = await this.componenteRepository.getById(id_hijo);
    if (!hijo) {
      throw new NotFoundError("Child componente not found");
    }

    return this.compuestoRepository.assign(id_padre, id_hijo);
  }
}
