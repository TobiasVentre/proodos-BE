"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "tipo_variacion" },
      "html",
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  async down(queryInterface: any) {
    await queryInterface.removeColumn(
      { schema: "dbo", tableName: "tipo_variacion" },
      "html"
    );
  },
};
