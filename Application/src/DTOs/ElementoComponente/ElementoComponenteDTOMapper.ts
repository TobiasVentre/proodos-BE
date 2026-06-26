import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ICreateElementoComponenteDTO } from "./ICreateElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "./IUpdateElementoComponenteDTO";

export const mapCreateElementoComponenteDTOToEntity = (
  dto: ICreateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: 0,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  selector: dto.selector ?? null,
  icono_img: dto.icono_img ?? null,
  descripcion: dto.descripcion ?? null,
  link: dto.link ?? null,
  orden: dto.orden,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  contrato_minimo: dto.contrato_minimo ?? null,
});

export const mapUpdateElementoComponenteDTOToEntity = (
  dto: IUpdateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: dto.id_elemento,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  selector: dto.selector ?? null,
  icono_img: dto.icono_img ?? null,
  descripcion: dto.descripcion ?? null,
  link: dto.link ?? null,
  orden: dto.orden,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  contrato_minimo: dto.contrato_minimo ?? null,
});
