import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingComponenteModel, LandingPageModel, ComponenteModel } from "../../Models";
import { LandingComponenteMapper } from "../../../Mappers/LandingComponenteMapper";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";

export class LandingComponenteCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async assign(entity: LandingComponente): Promise<LandingComponente> {
    this.logger.info("[Repository] LandingComponenteCommandRepository.assign()", {
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    });

    await LandingComponenteModel.create({
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    });

    const created = await LandingComponenteModel.findOne({
      where: { id_landing: entity.id_landing, id_componente: entity.id_componente },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    if (!created) {
      throw new NotFoundError("Landing componente not found");
    }

    return LandingComponenteMapper.toDomain(created);
  }

  async unassign(id_landing: number, id_componente: number): Promise<void> {
    this.logger.info("[Repository] LandingComponenteCommandRepository.unassign()", {
      id_landing,
      id_componente,
    });

    const deletedCount = await LandingComponenteModel.destroy({
      where: { id_landing, id_componente },
    });

    if (deletedCount === 0) {
      this.logger.warn(
        "[Repository] LandingComponenteCommandRepository.unassign() no rows removed",
        { id_landing, id_componente }
      );
    }
  }
}
