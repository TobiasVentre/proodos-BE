import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { IDeleteLandingPageUseCase } from "../../Ports/ILandingPageUseCases";

export class DeleteLandingPageService implements IDeleteLandingPageUseCase {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number): Promise<void> {
    await this.landingPageRepository.delete(id_landing);
  }
}
