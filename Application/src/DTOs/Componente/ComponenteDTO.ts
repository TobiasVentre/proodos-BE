export interface ComponenteDTO {
  id_componente: number;
  id_tipo_componente: number;
  id_plan: number;
  id_tipo_variacion: number;
  nombre: string;
  fecha_creacion: Date;
  plan?: Record<string, unknown>;
}
