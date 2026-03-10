import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ICreateElementoComponenteDTO } from "./ICreateElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "./IUpdateElementoComponenteDTO";

export const mapCreateElementoComponenteDTOToEntity = (
  dto: ICreateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: 0,
  id_componente: dto.id_componente,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  icono_img: dto.icono_img,
  descripcion: dto.descripcion,
  link: dto.link,
  orden: dto.orden,
  css_url: dto.css_url,
});

export const mapUpdateElementoComponenteDTOToEntity = (
  dto: IUpdateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: dto.id_elemento,
  id_componente: dto.id_componente,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  icono_img: dto.icono_img,
  descripcion: dto.descripcion,
  link: dto.link,
  orden: dto.orden,
  css_url: dto.css_url,
});
