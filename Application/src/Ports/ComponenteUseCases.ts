import { CreateComponenteDTO } from "../DTOs/Componente/CreateComponenteDTO";
import { PatchComponenteDTO } from "../DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";

export interface CreateComponenteUseCase {
  execute(dto: CreateComponenteDTO): Promise<Componente>;
}

export interface GetAllComponentesUseCase {
  execute(): Promise<Componente[]>;
}

export interface GetComponenteByIdUseCase {
  execute(id_componente: number): Promise<Componente | null>;
}

export interface PatchComponenteUseCase {
  execute(id_componente: number, dto: PatchComponenteDTO): Promise<Componente>;
}

export interface DeleteComponenteUseCase {
  execute(id_componente: number): Promise<void>;
}
