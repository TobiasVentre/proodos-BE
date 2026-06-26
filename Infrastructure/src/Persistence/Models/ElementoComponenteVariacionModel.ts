import { Model, DataTypes, Sequelize } from "sequelize";

export class ElementoComponenteVariacionModel extends Model {
  id_elemento_componente_variacion!: number;
  id_elemento!: number;
  id_tipo_variacion!: number;
  id_componente!: number | null;
  metadata!: string;

  static initModel(sequelize: Sequelize) {
    ElementoComponenteVariacionModel.init(
      {
        id_elemento_componente_variacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_elemento: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tipo_variacion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_componente: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        metadata: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: "{}",
        },
      },
      {
        sequelize,
        tableName: "elemento_componente_variacion",
        schema: "dbo",
        timestamps: false,
      }
    );
    return ElementoComponenteVariacionModel;
  }
}
