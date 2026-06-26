import { QueryInterface, DataTypes } from "sequelize";

const elementoTable = { schema: "dbo", tableName: "elemento_componente" };

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DECLARE @fkName NVARCHAR(128);

      SELECT @fkName = fk.name
      FROM sys.foreign_keys fk
      INNER JOIN sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
      INNER JOIN sys.tables parentTable ON parentTable.object_id = fkc.parent_object_id
      INNER JOIN sys.schemas parentSchema ON parentSchema.schema_id = parentTable.schema_id
      INNER JOIN sys.columns parentColumn
        ON parentColumn.object_id = parentTable.object_id
       AND parentColumn.column_id = fkc.parent_column_id
      WHERE parentSchema.name = 'dbo'
        AND parentTable.name = 'elemento_componente'
        AND parentColumn.name = 'id_componente';

      IF @fkName IS NOT NULL
        EXEC('ALTER TABLE [dbo].[elemento_componente] DROP CONSTRAINT [' + @fkName + ']');

      IF EXISTS (
        SELECT 1 FROM sys.indexes
        WHERE name = 'IX_elemento_componente_id_componente'
          AND object_id = OBJECT_ID('[dbo].[elemento_componente]')
      )
        DROP INDEX [IX_elemento_componente_id_componente]
        ON [dbo].[elemento_componente];
    `);

    await queryInterface.removeColumn(elementoTable, "id_componente");
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.addColumn(elementoTable, "id_componente", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addIndex(elementoTable, ["id_componente"], {
      name: "IX_elemento_componente_id_componente",
    });

    await queryInterface.addConstraint(elementoTable, {
      fields: ["id_componente"],
      type: "foreign key",
      name: "FK_elemento_componente_componente_contract_undo",
      references: {
        table: { schema: "dbo", tableName: "componente" },
        field: "id_componente",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
