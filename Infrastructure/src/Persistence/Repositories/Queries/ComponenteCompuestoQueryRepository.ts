import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";
import { ComponenteCompuestoModel } from "../../Models";

export class ComponenteCompuestoQueryRepository {
  constructor(private readonly logger: ILogger) {}

  async getAll(): Promise<ComponenteCompuesto[]> {
    this.logger.info("[Repository] ComponenteCompuestoQueryRepository.getAll()");

    const rows = await ComponenteCompuestoModel.findAll({
      order: [
        ["id_padre", "ASC"],
        ["id_hijo", "ASC"],
      ],
    });

    return rows.map((row) => ({
      id_padre: row.id_padre,
      id_hijo: row.id_hijo,
    }));
  }
}
