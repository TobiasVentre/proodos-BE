import { CreatePlanDTO } from "../DTOs/Plan/CreatePlanDTO";
import { UpdatePlanDTO } from "../DTOs/Plan/UpdatePlanDTO";
import { Plan } from "@proodos/domain/Entities/Plan";

export interface CreatePlanUseCase {
  execute(dto: CreatePlanDTO): Promise<Plan>;
}

export interface GetAllPlansUseCase {
  execute(): Promise<Plan[]>;
}

export interface GetPlanByIdUseCase {
  execute(id_plan: number): Promise<Plan | null>;
}

export interface UpdatePlanUseCase {
  execute(dto: UpdatePlanDTO): Promise<Plan>;
}
