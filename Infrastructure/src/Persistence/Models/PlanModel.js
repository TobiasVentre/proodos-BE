"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const sequelize_1 = require("sequelize");
class PlanModel extends sequelize_1.Model {
    static initModel(sequelize) {
        PlanModel.init({
            id_plan: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            segmento: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            producto: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            bonete: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            nombre_plan: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            capacidad: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            capacidad_plan: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
            },
            capacidad_anterior: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            precio_full_price: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            precio_oferta: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            tag_1: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            tag_2: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            beneficio_1: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            beneficio_2: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            beneficio_3: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            beneficio_4: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            cta_1: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            link_1: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            cta_2: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            link_2: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            aumento: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            precio_tv_digital: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: true,
            },
            precio_tv_max: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: true,
            },
            promo_activa: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            muestra_desde: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
            },
            canales_tv_digital: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            canales_tv_max: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            precio_no_cliente: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: true,
            },
            descripcion_oferta: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            comercial_name: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            comercial_id: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            telefono_0800: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
            },
            icono_tag_1: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            pre_beneficio_2_titulo: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            pre_beneficio_2_descripcion: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            pre_beneficio_1_titulo: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            pre_beneficio_1_descripcion: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            nombre_plan_tv: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
            },
            grilla_canales: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            icono_bonete: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            precio_sin_iva: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: "plan",
            schema: "dbo",
            timestamps: false,
        });
        return PlanModel;
    }
}
exports.PlanModel = PlanModel;
