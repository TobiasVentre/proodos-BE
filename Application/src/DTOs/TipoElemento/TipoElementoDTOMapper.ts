import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ICreateTipoElementoDTO } from "./ICreateTipoElementoDTO";
import { IUpdateTipoElementoDTO } from "./IUpdateTipoElementoDTO";

export const mapCreateTipoElementoDTOToEntity = (
  dto: ICreateTipoElementoDTO
): TipoElemento => ({
  id_tipo_elemento: 0,
  nombre: dto.nombre,
});

export const mapUpdateTipoElementoDTOToEntity = (
  dto: IUpdateTipoElementoDTO
): TipoElemento => ({
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
});
