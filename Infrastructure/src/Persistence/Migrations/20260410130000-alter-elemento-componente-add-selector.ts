'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "elemento_componente" },
      "selector",
      {
        type: Sequelize.STRING(150),
        allowNull: true,
      }
    );
  },

  async down(queryInterface: any) {
    await queryInterface.removeColumn(
      { schema: "dbo", tableName: "elemento_componente" },
      "selector"
    );
  },
};
