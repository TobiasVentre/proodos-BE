"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre",
      { type: Sequelize.CHAR(100), allowNull: true }
    );

    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "segmento",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "producto",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "bonete",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "capacidad_plan",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_1",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "tag_2",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_2",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_3",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "beneficio_4",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_1",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "link_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "cta_2",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "link_2",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "precio_tv_digital",
      { type: Sequelize.DECIMAL(12, 2), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "precio_tv_max",
      { type: Sequelize.DECIMAL(12, 2), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "promo_activa",
      { type: Sequelize.BOOLEAN, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "muestra_desde",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "canales_tv_digital",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "canales_tv_max",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "precio_no_cliente",
      { type: Sequelize.DECIMAL(12, 2), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "descripcion_oferta",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_name",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "comercial_id",
      { type: Sequelize.CHAR(100), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "telefono_0800",
      { type: Sequelize.CHAR(50), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_tag_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_2_titulo",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_2_descripcion",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_1_titulo",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "pre_beneficio_1_descripcion",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre_plan_tv",
      { type: Sequelize.CHAR(150), allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "grilla_canales",
      { type: Sequelize.TEXT, allowNull: true }
    );
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_bonete",
      { type: Sequelize.CHAR(255), allowNull: true }
    );

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "componente" },
      "id_plan",
      { type: Sequelize.INTEGER, allowNull: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "icono_bonete");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "grilla_canales");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "nombre_plan_tv");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "pre_beneficio_1_descripcion");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "pre_beneficio_1_titulo");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "pre_beneficio_2_descripcion");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "pre_beneficio_2_titulo");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "icono_tag_1");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "telefono_0800");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "comercial_id");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "comercial_name");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "descripcion_oferta");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "precio_no_cliente");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "canales_tv_max");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "canales_tv_digital");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "muestra_desde");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "promo_activa");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "precio_tv_max");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "precio_tv_digital");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "link_2");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "cta_2");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "link_1");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "cta_1");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "beneficio_4");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "beneficio_3");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "beneficio_2");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "beneficio_1");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "tag_2");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "tag_1");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "capacidad_plan");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "nombre_plan");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "bonete");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "producto");
    await queryInterface.removeColumn({ schema: "dbo", tableName: "plan" }, "segmento");

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "nombre",
      { type: Sequelize.CHAR(100), allowNull: false }
    );

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "componente" },
      "id_plan",
      { type: Sequelize.INTEGER, allowNull: false }
    );
  },
};
