import { Op, literal } from "sequelize";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingComponenteModel, LandingPageModel, ComponenteModel } from "../../Models";
import { LandingComponenteMapper } from "../../../Mappers/LandingComponenteMapper";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { sequelize } from "../../../Config/SequelizeConfig";

export class LandingComponenteCommandRepository {
  constructor(private readonly logger: ILogger) {}

  private readonly includeRelations = [
    { model: LandingPageModel, as: "landing", required: false },
    { model: ComponenteModel, as: "componente", required: false },
  ];

  private normalizeInsertOrder(order: number | undefined, maxAllowed: number): number {
    if (!Number.isInteger(order) || Number(order) <= 0) {
      return maxAllowed;
    }

    return Math.min(Number(order), maxAllowed);
  }

  async assign(entity: LandingComponente): Promise<LandingComponente> {
    this.logger.info("[Repository] LandingComponenteCommandRepository.assign()", {
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
      orden: entity.orden,
    });

    return sequelize.transaction(async (transaction) => {
      const total = await LandingComponenteModel.count({
        where: { id_landing: entity.id_landing },
        transaction,
      });
      const orden = this.normalizeInsertOrder(entity.orden, total + 1);

      await LandingComponenteModel.update(
        { orden: literal("orden + 1") },
        {
          where: {
            id_landing: entity.id_landing,
            orden: { [Op.gte]: orden },
          },
          transaction,
        }
      );

      await LandingComponenteModel.create(
        {
          id_landing: entity.id_landing,
          id_componente: entity.id_componente,
          orden,
        },
        { transaction }
      );

      const created = await LandingComponenteModel.findOne({
        where: { id_landing: entity.id_landing, id_componente: entity.id_componente },
        include: this.includeRelations,
        transaction,
      });

      if (!created) {
        throw new NotFoundError("Landing componente not found");
      }

      return LandingComponenteMapper.toDomain(created);
    });
  }

  async updateOrden(
    id_landing: number,
    id_componente: number,
    orden: number
  ): Promise<LandingComponente> {
    this.logger.info("[Repository] LandingComponenteCommandRepository.updateOrden()", {
      id_landing,
      id_componente,
      orden,
    });

    return sequelize.transaction(async (transaction) => {
      const current = await LandingComponenteModel.findOne({
        where: { id_landing, id_componente },
        transaction,
      });

      if (!current) {
        throw new NotFoundError("Landing componente not found");
      }

      const total = await LandingComponenteModel.count({
        where: { id_landing },
        transaction,
      });
      const currentOrden = Number(current.orden ?? total);
      const targetOrden = Math.min(Math.max(Number(orden), 1), Math.max(total, 1));

      if (targetOrden < currentOrden) {
        await LandingComponenteModel.update(
          { orden: literal("orden + 1") },
          {
            where: {
              id_landing,
              id_componente: { [Op.ne]: id_componente },
              orden: {
                [Op.gte]: targetOrden,
                [Op.lt]: currentOrden,
              },
            },
            transaction,
          }
        );
      } else if (targetOrden > currentOrden) {
        await LandingComponenteModel.update(
          { orden: literal("orden - 1") },
          {
            where: {
              id_landing,
              id_componente: { [Op.ne]: id_componente },
              orden: {
                [Op.gt]: currentOrden,
                [Op.lte]: targetOrden,
              },
            },
            transaction,
          }
        );
      }

      if (targetOrden !== currentOrden) {
        await current.update({ orden: targetOrden }, { transaction });
      }

      const updated = await LandingComponenteModel.findOne({
        where: { id_landing, id_componente },
        include: this.includeRelations,
        transaction,
      });

      if (!updated) {
        throw new NotFoundError("Landing componente not found");
      }

      return LandingComponenteMapper.toDomain(updated);
    });
  }

  async unassign(id_landing: number, id_componente: number): Promise<void> {
    this.logger.info("[Repository] LandingComponenteCommandRepository.unassign()", {
      id_landing,
      id_componente,
    });

    await sequelize.transaction(async (transaction) => {
      const current = await LandingComponenteModel.findOne({
        where: { id_landing, id_componente },
        transaction,
      });

      if (!current) {
        this.logger.warn(
          "[Repository] LandingComponenteCommandRepository.unassign() no rows removed",
          { id_landing, id_componente }
        );
        return;
      }

      const removedOrden = Number(current.orden ?? 0);
      await LandingComponenteModel.destroy({
        where: { id_landing, id_componente },
        transaction,
      });

      if (removedOrden > 0) {
        await LandingComponenteModel.update(
          { orden: literal("orden - 1") },
          {
            where: {
              id_landing,
              orden: { [Op.gt]: removedOrden },
            },
            transaction,
          }
        );
      }
    });
  }
}
