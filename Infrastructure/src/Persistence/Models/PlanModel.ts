import { Model, DataTypes, Sequelize } from "sequelize";

export class PlanModel extends Model {
  id_plan!: number;
  segmento?: string | null;
  producto?: string | null;
  bonete?: string | null;
  nombre?: string | null;
  nombre_plan?: string | null;
  capacidad?: number | null;
  capacidad_plan?: string | null;
  capacidad_anterior?: number | null;
  precio_full_price?: number | null;
  precio_oferta?: number | null;
  tag_1?: string | null;
  tag_2?: string | null;
  beneficio_1?: string | null;
  beneficio_2?: string | null;
  beneficio_3?: string | null;
  beneficio_4?: string | null;
  cta_1?: string | null;
  link_1?: string | null;
  cta_2?: string | null;
  link_2?: string | null;
  aumento?: number | null;
  precio_tv_digital?: number | null;
  precio_tv_max?: number | null;
  promo_activa?: boolean | null;
  muestra_desde?: string | null;
  canales_tv_digital?: string | null;
  canales_tv_max?: string | null;
  precio_no_cliente?: number | null;
  descripcion_oferta?: string | null;
  comercial_name?: string | null;
  comercial_id?: string | null;
  telefono_0800?: string | null;
  icono_tag_1?: string | null;
  pre_beneficio_2_titulo?: string | null;
  pre_beneficio_2_descripcion?: string | null;
  pre_beneficio_1_titulo?: string | null;
  pre_beneficio_1_descripcion?: string | null;
  nombre_plan_tv?: string | null;
  grilla_canales?: string | null;
  icono_bonete?: string | null;
  precio_sin_iva?: number | null;

  static initModel(sequelize: Sequelize) {
    PlanModel.init(
      {
        id_plan: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        segmento: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        producto: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        bonete: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        nombre_plan: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        capacidad: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        capacidad_plan: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        capacidad_anterior: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        precio_full_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        precio_oferta: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        tag_1: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        tag_2: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        beneficio_1: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        beneficio_2: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        beneficio_3: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        beneficio_4: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        cta_1: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        link_1: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        cta_2: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        link_2: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        aumento: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        precio_tv_digital: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: true,
        },
        precio_tv_max: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: true,
        },
        promo_activa: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        muestra_desde: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        canales_tv_digital: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        canales_tv_max: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        precio_no_cliente: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: true,
        },
        descripcion_oferta: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        comercial_name: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        comercial_id: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        telefono_0800: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        icono_tag_1: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        pre_beneficio_2_titulo: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        pre_beneficio_2_descripcion: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        pre_beneficio_1_titulo: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        pre_beneficio_1_descripcion: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        nombre_plan_tv: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        grilla_canales: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        icono_bonete: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        precio_sin_iva: {
          type: DataTypes.DECIMAL(10, 2),
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
