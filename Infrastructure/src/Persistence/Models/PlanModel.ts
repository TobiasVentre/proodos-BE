import { DataTypes, Model, Sequelize } from "sequelize";

export class PlanModel extends Model {
  id_plan!: number;

  static initModel(sequelize: Sequelize) {
    PlanModel.init(
      {
        id_plan: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
