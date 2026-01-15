IF COL_LENGTH('dbo.componente', 'estado') IS NULL
BEGIN
  ALTER TABLE dbo.componente
    ADD estado VARCHAR(50) NOT NULL
    CONSTRAINT DF_componente_estado DEFAULT 'ACTIVO';
END;

IF COL_LENGTH('dbo.componente', 'fecha_baja') IS NULL
BEGIN
  ALTER TABLE dbo.componente
    ADD fecha_baja DATETIME NULL;
END;
