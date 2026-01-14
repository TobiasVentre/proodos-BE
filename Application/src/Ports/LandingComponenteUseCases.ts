import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export interface AssignLandingComponenteUseCase {
  execute(
    id_landing: number,
    id_componente: number
  ): Promise<{ data: LandingComponente; existed: boolean }>;
}
