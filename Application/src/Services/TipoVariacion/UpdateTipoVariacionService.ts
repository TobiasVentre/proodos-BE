import { IUpdateTipoVariacionDTO } from "../../DTOs/TipoVariacion/IUpdateTipoVariacionDTO";
import { mapUpdateTipoVariacionDTOToEntity } from "../../DTOs/TipoVariacion/TipoVariacionDTOMapper";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { IUpdateTipoVariacionUseCase } from "../../Ports/ITipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ensureTipoComponenteExists } from "./ensureTipoComponenteExists";

export class UpdateTipoVariacionService implements IUpdateTipoVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly tipoComponenteRepository: ITipoComponenteRepository
  ) {}

  async execute(dto: IUpdateTipoVariacionDTO): Promise<TipoVariacion> {
    await ensureTipoComponenteExists(
      this.tipoComponenteRepository,
      dto.id_tipo_componente
    );
    const entity = mapUpdateTipoVariacionDTOToEntity(dto);
    return this.tipoVariacionRepository.update(entity);
  }
}
