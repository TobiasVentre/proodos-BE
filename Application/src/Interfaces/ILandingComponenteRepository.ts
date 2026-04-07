import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export interface ILandingComponenteRepository {
  assign(component: LandingComponente): Promise<LandingComponente>;
  updateOrden(
    id_landing: number,
    id_componente: number,
    orden: number
  ): Promise<LandingComponente>;
  unassign(id_landing: number, id_componente: number): Promise<void>;
  getByLanding(id_landing: number): Promise<LandingComponente[]>;
  getByComponente(id_componente: number): Promise<LandingComponente[]>;
  getMaxOrdenByLanding(id_landing: number): Promise<number>;
  exists(id_landing: number, id_componente: number): Promise<boolean>;
  existsByComponente(id_componente: number): Promise<boolean>;
}
