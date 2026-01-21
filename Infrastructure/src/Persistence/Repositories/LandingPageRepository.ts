import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { LandingPageCommandRepository } from "./Commands/LandingPageCommandRepository";
import { LandingPageQueryRepository } from "./Queries/LandingPageQueryRepository";

export class LandingPageRepository implements ILandingPageRepository {
  private readonly commandRepository: LandingPageCommandRepository;
  private readonly queryRepository: LandingPageQueryRepository;

  constructor(logger: ILogger) {
    this.commandRepository = new LandingPageCommandRepository(logger);
    this.queryRepository = new LandingPageQueryRepository(logger);
  }

  async create(entity: LandingPage): Promise<LandingPage> {
    return this.commandRepository.create(entity);
  }

  async update(entity: LandingPage): Promise<LandingPage> {
    return this.commandRepository.update(entity);
  }

  async delete(id_landing: number): Promise<void> {
    return this.commandRepository.delete(id_landing);
  }

  async getById(id_landing: number): Promise<LandingPage | null> {
    return this.queryRepository.getById(id_landing);
  }

  async getAll(): Promise<LandingPage[]> {
    return this.queryRepository.getAll();
  }
}
