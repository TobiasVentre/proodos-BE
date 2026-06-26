export interface IElementoComponenteAsignacionDTO {
  id_tipo_variacion: number;
  id_componente?: number | null;
  metadata?: Record<string, unknown> | null;
}
