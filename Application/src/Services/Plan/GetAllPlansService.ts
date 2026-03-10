import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { Plan } from "@proodos/domain/Entities/Plan";
import { IGetAllPlansUseCase } from "../../Ports/IPlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllPlansService implements IGetAllPlansUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<Plan[]> {
    this.logger.info("[Service] GetAllPlansService.execute()");
    return await this.planRepository.getAll();
  }
}
