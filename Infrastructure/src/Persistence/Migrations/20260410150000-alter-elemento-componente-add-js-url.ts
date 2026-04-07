import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      { tableName: "elemento_componente", schema: "dbo" },
      "js_url",
      {
        type: DataTypes.STRING(500),
        allowNull: true,
      }
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
      { tableName: "elemento_componente", schema: "dbo" },
      "js_url"
    );
  },
};
