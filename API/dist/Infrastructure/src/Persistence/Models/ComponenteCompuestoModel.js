"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteCompuestoModel = void 0;
const sequelize_1 = require("sequelize");
class ComponenteCompuestoModel extends sequelize_1.Model {
    static initModel(sequelize) {
        ComponenteCompuestoModel.init({
            id_padre: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
            },
            id_hijo: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
            },
        }, {
            sequelize,
            tableName: "componente_compuesto",
            schema: "dbo",
            timestamps: false,
        });
        return ComponenteCompuestoModel;
    }
}
exports.ComponenteCompuestoModel = ComponenteCompuestoModel;
