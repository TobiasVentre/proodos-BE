import { Model, DataTypes, Sequelize } from "sequelize";

export class ElementoComponenteModel extends Model {
  id_elemento!: number;
  id_componente!: number;
  id_tipo_elemento!: number;
  nombre!: string;
  selector!: string | null;
  icono_img!: string | null;
  descripcion!: string | null;
  link!: string | null;
  orden!: number;
  css_url!: string | null;
  js_url!: string | null;

  static initModel(sequelize: Sequelize) {
    ElementoComponenteModel.init(
      {
        id_elemento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_componente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tipo_elemento: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        selector: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        icono_img: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        descripcion: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        link: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        orden: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        css_url: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        js_url: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "elemento_componente",
        schema: "dbo",
        timestamps: false,
      }
    );
    return ElementoComponenteModel;
  }
}
