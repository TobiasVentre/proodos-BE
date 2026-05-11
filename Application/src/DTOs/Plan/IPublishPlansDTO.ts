import { IPatchPlanFullDTO } from "./IPatchPlanFullDTO";

export interface IPublishPlanChangeDTO extends IPatchPlanFullDTO {
  id_plan: number;
}

export interface IPlanPublicationResultDTO {
  server: "primary" | "secondary";
  destination: string;
  success: boolean;
  status?: number;
  message?: string;
}

export interface IPublishPlansResultDTO {
  savedPlans: number;
  exportedFilePath: string;
  publicationResults: IPlanPublicationResultDTO[];
  publishedAt: string;
}
