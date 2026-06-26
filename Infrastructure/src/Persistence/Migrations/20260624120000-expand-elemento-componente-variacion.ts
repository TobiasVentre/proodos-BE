import { QueryInterface, DataTypes } from "sequelize";

const table = { schema: "dbo", tableName: "elemento_componente_variacion" };
const elementoTable = { schema: "dbo", tableName: "elemento_componente" };

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(elementoTable, "contrato_minimo", {
      type: DataTypes.TEXT,
      allowNull: true,
    });

    await queryInterface.createTable(table, {
      id_elemento_componente_variacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_elemento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: elementoTable,
          key: "id_elemento",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_tipo_variacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { schema: "dbo", tableName: "tipo_variacion" },
          key: "id_tipo_variacion",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      id_componente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: { schema: "dbo", tableName: "componente" },
          key: "id_componente",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      metadata: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "{}",
      },
    });

    await queryInterface.addIndex(table, ["id_componente"], {
      name: "IX_elemento_componente_variacion_id_componente",
    });
    await queryInterface.addIndex(table, ["id_tipo_variacion"], {
      name: "IX_elemento_componente_variacion_id_tipo_variacion",
    });

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX [UX_elemento_componente_variacion_global]
      ON [dbo].[elemento_componente_variacion] ([id_elemento], [id_tipo_variacion])
      WHERE [id_componente] IS NULL;

      CREATE UNIQUE INDEX [UX_elemento_componente_variacion_especifica]
      ON [dbo].[elemento_componente_variacion] ([id_elemento], [id_tipo_variacion], [id_componente])
      WHERE [id_componente] IS NOT NULL;

      ALTER TABLE [dbo].[elemento_componente_variacion]
      ADD CONSTRAINT [CK_elemento_componente_variacion_metadata_json]
      CHECK (ISJSON([metadata]) = 1);

      ALTER TABLE [dbo].[elemento_componente]
      ADD CONSTRAINT [CK_elemento_componente_contrato_minimo_json]
      CHECK ([contrato_minimo] IS NULL OR ISJSON([contrato_minimo]) = 1);

      ALTER TABLE [dbo].[elemento_componente]
      ALTER COLUMN [id_componente] INT NULL;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(table);

    await queryInterface.sequelize.query(`
      IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_elemento_componente_contrato_minimo_json')
        ALTER TABLE [dbo].[elemento_componente] DROP CONSTRAINT [CK_elemento_componente_contrato_minimo_json];

      ALTER TABLE [dbo].[elemento_componente]
      ALTER COLUMN [id_componente] INT NOT NULL;
    `);

    await queryInterface.removeColumn(elementoTable, "contrato_minimo");
  },
};
