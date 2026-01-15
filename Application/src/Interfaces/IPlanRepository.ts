export interface IPlanRepository {
  exists(id_plan: number): Promise<boolean>;
}
