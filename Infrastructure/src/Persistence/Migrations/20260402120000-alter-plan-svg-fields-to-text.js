"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_tag_1",
      { type: Sequelize.TEXT, allowNull: true }
    );

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "plan" },
      "icono_bonete",
      { type: Sequelize.TEXT, allowNull: true }
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
      "icono_tag_1",
      { type: Sequelize.CHAR(255), allowNull: true }
    );
  },
};
