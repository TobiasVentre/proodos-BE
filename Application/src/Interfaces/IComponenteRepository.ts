import { Componente } from "@proodos/domain/Entities/Componente";

export interface IComponenteRepository {
  create(componente: Componente): Promise<Componente>;
  update(componente: Componente): Promise<Componente>;
  delete(id_componente: number): Promise<void>;   // soft delete se manejará en Infra
  getById(id_componente: number): Promise<Componente | null>;
  getAll(): Promise<Componente[]>;                // luego agregamos filtros
}