import { Model, DataTypes, Sequelize } from "sequelize";

export class PlanModel extends Model {
  id_plan!: number;
  nombre?: string;

  static initModel(sequelize: Sequelize) {
    PlanModel.init(
      {
        id_plan: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "plan",
        schema: "dbo",
        timestamps: false,
      }
    );

    return PlanModel;
  }
}
