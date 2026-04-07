import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IPatchComponenteDTO } from "../../DTOs/Componente/IPatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IPatchComponenteUseCase } from "../../Ports/IComponenteUseCases";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ensurePlanExists } from "./ensurePlanExists";
import { ValidationError } from "../../Errors/ValidationError";

export class PatchComponenteService implements IPatchComponenteUseCase {
  constructor(
    private readonly repo: IComponenteRepository,
    private readonly planRepository: IPlanRepository
  ) {}

  async execute(id_componente: number, dto: IPatchComponenteDTO): Promise<Componente> {
    if (dto.id_plan !== undefined && dto.id_plan !== null) {
      await ensurePlanExists(this.planRepository, dto.id_plan);
    }
    if (dto.selector_hijos !== undefined && dto.selector_hijos !== null) {
      const selector = String(dto.selector_hijos).trim();
      const isValidSelector = /^([#.])[A-Za-z_][A-Za-z0-9_-]*$/.test(selector);
      if (!isValidSelector) {
        throw new ValidationError(
          "VALIDATION_ERROR",
          "selector_hijos must be a valid id or class selector (e.g. #id or .class)",
          { field: "selector_hijos" }
        );
      }
      dto.selector_hijos = selector;
    }
    return this.repo.patch(id_componente, dto);
  }
}
