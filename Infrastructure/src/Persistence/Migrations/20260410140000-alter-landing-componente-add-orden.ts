'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "landing_componente" },
      "orden",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );

    await queryInterface.sequelize.query(`
      WITH ordered_rows AS (
        SELECT
          id_landing,
          id_componente,
          ROW_NUMBER() OVER (PARTITION BY id_landing ORDER BY id_componente ASC) AS next_orden
        FROM dbo.landing_componente
      )
      UPDATE lc
      SET lc.orden = ordered_rows.next_orden
      FROM dbo.landing_componente lc
      INNER JOIN ordered_rows
        ON ordered_rows.id_landing = lc.id_landing
       AND ordered_rows.id_componente = lc.id_componente
    `);

    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "landing_componente" },
      "orden",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "landing_componente" },
      ["id_landing", "orden"],
      { name: "IX_landing_componente_id_landing_orden" }
    );
  },

  async down(queryInterface: any) {
    await queryInterface.removeIndex(
      { schema: "dbo", tableName: "landing_componente" },
      "IX_landing_componente_id_landing_orden"
    );

    await queryInterface.removeColumn(
      { schema: "dbo", tableName: "landing_componente" },
      "orden"
    );
  },
};
