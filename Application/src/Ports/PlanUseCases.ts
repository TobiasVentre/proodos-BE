import { CreatePlanDTO } from "../DTOs/Plan/CreatePlanDTO";
import { CreatePlanFullDTO } from "../DTOs/Plan/CreatePlanFullDTO";
import { PatchPlanDTO } from "../DTOs/Plan/PatchPlanDTO";
import { PatchPlanFullDTO } from "../DTOs/Plan/PatchPlanFullDTO";
import { UpdatePlanDTO } from "../DTOs/Plan/UpdatePlanDTO";
import { Plan } from "@proodos/domain/Entities/Plan";

export interface CreatePlanUseCase {
  execute(dto: CreatePlanDTO): Promise<Plan>;
}

export interface CreatePlanFullUseCase {
  execute(dto: CreatePlanFullDTO): Promise<Plan>;
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

export interface PatchPlanUseCase {
  execute(id_plan: number, dto: PatchPlanDTO): Promise<Plan>;
}

export interface PatchPlanFullUseCase {
  execute(id_plan: number, dto: PatchPlanFullDTO): Promise<Plan>;
}

export interface DeletePlanUseCase {
  execute(id_plan: number): Promise<void>;
}
