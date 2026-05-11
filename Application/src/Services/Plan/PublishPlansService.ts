import { ExternalServiceError } from "../../Errors/ExternalServiceError";
import { ILogger } from "../../Interfaces/ILogger";
import { IPlansDataOutputWriter } from "../../Interfaces/IPlansDataOutputWriter";
import { IPlansPublicationClient } from "../../Interfaces/IPlansPublicationClient";
import {
  IPatchPlanFullUseCase,
  IGetPlansDataUseCase,
  IPublishPlansUseCase,
} from "../../Ports/IPlanUseCases";
import {
  IPublishPlanChangeDTO,
  IPublishPlansResultDTO,
  IPlanPublicationResultDTO,
} from "../../DTOs/Plan/IPublishPlansDTO";

const PUBLICATION_DESTINATIONS = [
  "/apache/www/ofertas/php",
  "/apache/www/promos/php",
  "/apache/www/html/php",
] as const;

const PUBLICATION_SERVERS = ["primary", "secondary"] as const;

export class PublishPlansService implements IPublishPlansUseCase {
  constructor(
    private readonly patchPlanFullService: IPatchPlanFullUseCase,
    private readonly getPlansDataService: IGetPlansDataUseCase,
    private readonly plansDataOutputWriter: IPlansDataOutputWriter,
    private readonly plansPublicationClient: IPlansPublicationClient,
    private readonly logger: ILogger
  ) {}

  async execute(changes: IPublishPlanChangeDTO[]): Promise<IPublishPlansResultDTO> {
    this.logger.info("[Service] PublishPlansService.execute()", {
      count: changes.length,
    });

    for (const change of changes) {
      const { id_plan, ...dto } = change;
      await this.patchPlanFullService.execute(id_plan, dto);
    }

    await this.getPlansDataService.execute();

    const exportedFilePath = this.plansDataOutputWriter.getPlansDataFilePath();
    const publicationResults: IPlanPublicationResultDTO[] = [];

    for (const server of PUBLICATION_SERVERS) {
      for (const destination of PUBLICATION_DESTINATIONS) {
        try {
          const response = await this.plansPublicationClient.publish({
            server,
            sourcePath: exportedFilePath,
            destination,
            overwrite: true,
          });

          publicationResults.push({
            server,
            destination,
            success: true,
            status: response.status,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "No se pudo publicar plans-data.json.";
          publicationResults.push({
            server,
            destination,
            success: false,
            message,
          });
        }
      }
    }

    const failedResults = publicationResults.filter((result) => !result.success);
    if (failedResults.length > 0) {
      throw new ExternalServiceError(
        "PLANS_PUBLICATION_FAILED",
        "Los cambios se guardaron y el archivo se exporto, pero la publicacion fallo en uno o mas destinos.",
        {
          savedPlans: changes.length,
          exportedFilePath,
          publicationResults,
        }
      );
    }

    return {
      savedPlans: changes.length,
      exportedFilePath,
      publicationResults,
      publishedAt: new Date().toISOString(),
    };
  }
}
