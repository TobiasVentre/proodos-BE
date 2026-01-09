import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingComponenteModel } from "../Persistence/Models/LandingComponenteModel";

export class LandingComponenteMapper {
  static toDomain(model: LandingComponenteModel): LandingComponente {
    return {
      id_landing: model.id_landing,
      id_componente: model.id_componente,
    };
  }

  static toPersistence(entity: LandingComponente) {
    return {
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    };
  }
}
