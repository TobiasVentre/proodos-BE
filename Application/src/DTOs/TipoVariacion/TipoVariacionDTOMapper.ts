import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ICreateTipoVariacionDTO } from "./ICreateTipoVariacionDTO";
import { IUpdateTipoVariacionDTO } from "./IUpdateTipoVariacionDTO";

export const mapCreateTipoVariacionDTOToEntity = (
  dto: ICreateTipoVariacionDTO
): TipoVariacion => ({
  id_tipo_variacion: 0,
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? null,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  html: dto.html ?? null,
});

export const mapUpdateTipoVariacionDTOToEntity = (
  dto: IUpdateTipoVariacionDTO
): TipoVariacion => ({
  id_tipo_variacion: dto.id_tipo_variacion,
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? null,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  html: dto.html ?? null,
});
