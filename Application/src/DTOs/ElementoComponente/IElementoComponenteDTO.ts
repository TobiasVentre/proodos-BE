import { ContratoMinimoElemento } from "@proodos/domain/Entities/ContratoMinimoElemento";

export interface IElementoComponenteDTO {
  id_elemento: number;
  id_tipo_elemento: number;
  nombre: string;
  selector: string | null;
  icono_img: string | null;
  descripcion: string | null;
  link: string | null;
  orden: number;
  css_url: string | null;
  js_url: string | null;
  contrato_minimo: ContratoMinimoElemento | null;
  id_tipo_variacion?: number | null;
  id_componente?: number | null;
  metadata?: Record<string, unknown> | null;
}
