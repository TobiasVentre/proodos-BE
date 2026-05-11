import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { IPlansDataOutputWriter } from "../../Interfaces/IPlansDataOutputWriter";
import { IGetPlansDataUseCase, PlansDataSnapshot } from "../../Ports/IPlanUseCases";
import { mapPlanToExportDataDTO } from "../../DTOs/Plan/PlanExportDataDTOMapper";

export class GetPlansDataService implements IGetPlansDataUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly plansDataOutputWriter: IPlansDataOutputWriter,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<PlansDataSnapshot> {
    this.logger.info("[Service] GetPlansDataService.execute()");

    const plans = await this.planRepository.getAll();
    const sortedPlans = [...plans].sort((left, right) => left.id_plan - right.id_plan);
    const snapshot = sortedPlans.reduce<PlansDataSnapshot>((snapshot, plan) => {
      snapshot[String(plan.id_plan)] = mapPlanToExportDataDTO(plan);
      return snapshot;
    }, {});

    await this.plansDataOutputWriter.writePlansDataJson(
      JSON.stringify(snapshot, null, 2)
    );

    return snapshot;
  }
}
