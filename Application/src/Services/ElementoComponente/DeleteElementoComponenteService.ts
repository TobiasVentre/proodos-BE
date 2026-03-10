import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IDeleteElementoComponenteUseCase } from "../../Ports/IElementoComponenteUseCases";

export class DeleteElementoComponenteService implements IDeleteElementoComponenteUseCase {
  constructor(private readonly elementoComponenteRepository: IElementoComponenteRepository) {}

  async execute(id_elemento: number): Promise<void> {
    await this.elementoComponenteRepository.delete(id_elemento);
  }
}
