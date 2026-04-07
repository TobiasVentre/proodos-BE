import { IPlanDTO } from "../Plan/IPlanDTO";

export interface IComponenteDTO {
  id_componente: number;
  id_tipo_componente: number;
  id_plan: number | null;
  id_tipo_variacion: number;
  nombre: string;
  selector_hijos?: string | null;
  fecha_creacion: Date;
  estado: string;
  fecha_baja?: Date | null;
  plan?: IPlanDTO;
}
