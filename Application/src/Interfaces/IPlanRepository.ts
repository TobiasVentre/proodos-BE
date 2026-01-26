import { Plan } from "@proodos/domain/Entities/Plan";
import { PatchPlanDTO } from "../DTOs/Plan/PatchPlanDTO";
import { PatchPlanFullDTO } from "../DTOs/Plan/PatchPlanFullDTO";

export interface IPlanRepository {
  create(plan: Plan): Promise<Plan>;
  update(plan: Plan): Promise<Plan>;
  patch(id_plan: number, dto: PatchPlanDTO): Promise<Plan>;
  patchFull(id_plan: number, dto: PatchPlanFullDTO): Promise<Plan>;
  getById(id_plan: number): Promise<Plan | null>;
  getAll(): Promise<Plan[]>;
  exists(id_plan: number): Promise<boolean>;
  delete(id_plan: number): Promise<void>;
}
