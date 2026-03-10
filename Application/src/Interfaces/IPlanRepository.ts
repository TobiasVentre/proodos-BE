import { Plan } from "@proodos/domain/Entities/Plan";
import { IPatchPlanDTO } from "../DTOs/Plan/IPatchPlanDTO";
import { IPatchPlanFullDTO } from "../DTOs/Plan/IPatchPlanFullDTO";

export interface IPlanRepository {
  create(plan: Plan): Promise<Plan>;
  update(plan: Plan): Promise<Plan>;
  updateFull(plan: Plan): Promise<Plan>;
  patch(id_plan: number, dto: IPatchPlanDTO): Promise<Plan>;
  patchFull(id_plan: number, dto: IPatchPlanFullDTO): Promise<Plan>;
  getById(id_plan: number): Promise<Plan | null>;
  getAll(): Promise<Plan[]>;
  exists(id_plan: number): Promise<boolean>;
  delete(id_plan: number): Promise<void>;
}
