import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IPatchTipoVariacionUseCase } from "../../Ports/ITipoVariacionUseCases";
import { IPatchTipoVariacionDTO } from "../../DTOs/TipoVariacion/IPatchTipoVariacionDTO";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ensureTipoComponenteExists } from "./ensureTipoComponenteExists";

export class PatchTipoVariacionService implements IPatchTipoVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly tipoComponenteRepository: ITipoComponenteRepository
  ) {}

  async execute(
    id_tipo_variacion: number,
    dto: IPatchTipoVariacionDTO
  ): Promise<TipoVariacion> {
    if (dto.id_tipo_componente !== undefined) {
      await ensureTipoComponenteExists(
        this.tipoComponenteRepository,
        dto.id_tipo_componente
      );
    }
    return this.tipoVariacionRepository.patch(id_tipo_variacion, dto);
  }
}
