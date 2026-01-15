import { Plan } from "@proodos/domain/Entities/Plan";

export interface IPlanRepository {
  create(plan: Plan): Promise<Plan>;
  update(plan: Plan): Promise<Plan>;
  getById(id_plan: number): Promise<Plan | null>;
  getAll(): Promise<Plan[]>;
  exists(id_plan: number): Promise<boolean>;
}
