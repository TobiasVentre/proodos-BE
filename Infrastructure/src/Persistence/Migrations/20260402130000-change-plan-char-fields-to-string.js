"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre",
      { type: Sequelize.STRING(100), allowNull: true }
    );

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "segmento",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "producto",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "bonete",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "capacidad_plan",
      { type: Sequelize.STRING(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_1",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_2",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_1",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_2",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_3",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_4",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_1",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "link_1",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_2",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "link_2",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "muestra_desde",
      { type: Sequelize.STRING(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_name",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_id",
      { type: Sequelize.STRING(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "telefono_0800",
      { type: Sequelize.STRING(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_tag_1",
      { type: Sequelize.STRING(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_2_titulo",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_1_titulo",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan_tv",
      { type: Sequelize.STRING(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_bonete",
      { type: Sequelize.STRING(255), allowNull: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_bonete",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan_tv",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_1_titulo",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_2_titulo",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_tag_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "telefono_0800",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_id",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_name",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "muestra_desde",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "link_2",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_2",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "link_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_1",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_4",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_3",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_2",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_2",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_1",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "capacidad_plan",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "bonete",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "producto",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "segmento",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
  },
};
