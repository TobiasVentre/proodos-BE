import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ComponenteCompuestoModel } from "../../Models";

export class ComponenteCompuestoCommandRepository {
  constructor(private readonly logger: ILogger) {}

  async assign(id_padre: number, id_hijo: number): Promise<{ created: boolean }> {
    this.logger.info("[Repository] ComponenteCompuestoCommandRepository.assign()", {
      id_padre,
      id_hijo,
    });

    const [, created] = await ComponenteCompuestoModel.findOrCreate({
      where: { id_padre, id_hijo },
      defaults: { id_padre, id_hijo },
    });

    return { created };
  }

  async unassign(id_padre: number, id_hijo: number): Promise<void> {
    this.logger.info("[Repository] ComponenteCompuestoCommandRepository.unassign()", {
      id_padre,
      id_hijo,
    });

    const deletedCount = await ComponenteCompuestoModel.destroy({
      where: { id_padre, id_hijo },
    });

    if (deletedCount === 0) {
      this.logger.warn(
        "[Repository] ComponenteCompuestoCommandRepository.unassign() no rows removed",
        { id_padre, id_hijo }
      );
    }
  }
}
