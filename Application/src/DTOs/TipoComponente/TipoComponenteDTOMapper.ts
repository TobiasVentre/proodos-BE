import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ICreateTipoComponenteDTO } from "./ICreateTipoComponenteDTO";
import { IUpdateTipoComponenteDTO } from "./IUpdateTipoComponenteDTO";

export const mapCreateTipoComponenteDTOToEntity = (
  dto: ICreateTipoComponenteDTO
): TipoComponente => ({
  id_tipo_componente: 0,
  nombre: dto.nombre,
  estado: dto.estado,
});

export const mapUpdateTipoComponenteDTOToEntity = (
  dto: IUpdateTipoComponenteDTO
): TipoComponente => ({
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  estado: dto.estado,
});
