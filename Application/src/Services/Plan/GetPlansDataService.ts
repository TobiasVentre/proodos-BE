import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { IGetPlansDataUseCase, PlansDataSnapshot } from "../../Ports/IPlanUseCases";
import { mapPlanToExportDataDTO } from "../../DTOs/Plan/PlanExportDataDTOMapper";

export class GetPlansDataService implements IGetPlansDataUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<PlansDataSnapshot> {
    this.logger.info("[Service] GetPlansDataService.execute()");

    const plans = await this.planRepository.getAll();
    const sortedPlans = [...plans].sort((left, right) => left.id_plan - right.id_plan);

    return sortedPlans.reduce<PlansDataSnapshot>((snapshot, plan) => {
      snapshot[String(plan.id_plan)] = mapPlanToExportDataDTO(plan);
      return snapshot;
    }, {});
  }
}
