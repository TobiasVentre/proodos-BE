# Deploy - Elemento Componente por Variacion

## Contexto

No hay ambiente separado de desarrollo. Local y servidor apuntan a la misma DB SQL Server.

Como la app todavia no esta productiva, se trabajara con dos fases para reducir riesgo sin sobredimensionar el proceso.

## Fase 1 - Expand + BE Compatible

### Migracion DB

Archivo:

```txt
Infrastructure/src/Persistence/Migrations/20260624120000-expand-elemento-componente-variacion.ts
```

Hace:

- Agrega `dbo.elemento_componente.contrato_minimo` nullable.
- Crea `dbo.elemento_componente_variacion`.
- Agrega `metadata` con default `{}`.
- Agrega FKs a `elemento_componente`, `tipo_variacion` y `componente`.
- Agrega indices de lectura.
- Agrega indices unicos filtrados para asociaciones globales y especificas.
- Agrega checks `ISJSON` para `metadata` y `contrato_minimo`.
- Cambia `dbo.elemento_componente.id_componente` a nullable.
- No elimina `id_componente`.
- No elimina FK/indice viejo sobre `id_componente`.

### BE

El BE queda compatible con el FE actual:

- `POST /api/elementos-componente` acepta `id_componente` opcional.
- Si llega `id_componente`, crea el elemento y una asignacion especifica automaticamente.
- `GET /api/elementos-componente?id_componente=X` lee desde `elemento_componente_variacion`.
- `GET /api/elementos-componente/{id}/asignaciones` queda disponible.
- `PUT /api/elementos-componente/{id}/asignaciones` queda disponible.

### Archivos BE Fase 1

Transferir source o dist compilado segun el mecanismo del servidor.

Source relevante:

- `Domain/src/Entities/ContratoMinimoElemento.ts`
- `Domain/src/Entities/ElementoComponente.ts`
- `Domain/src/Entities/ElementoComponenteVariacion.ts`
- `Application/src/DTOs/ElementoComponente/*`
- `Application/src/Interfaces/IElementoComponenteRepository.ts`
- `Application/src/Ports/IElementoComponenteUseCases.ts`
- `Application/src/Services/ElementoComponente/*`
- `Infrastructure/src/Mappers/ElementoComponenteMapper.ts`
- `Infrastructure/src/Mappers/ElementoComponenteVariacionMapper.ts`
- `Infrastructure/src/Persistence/Models/ElementoComponenteModel.ts`
- `Infrastructure/src/Persistence/Models/ElementoComponenteVariacionModel.ts`
- `Infrastructure/src/Persistence/Models/index.ts`
- `Infrastructure/src/Persistence/Repositories/Commands/ElementoComponenteCommandRepository.ts`
- `Infrastructure/src/Persistence/Repositories/Queries/ElementoComponenteQueryRepository.ts`
- `Infrastructure/src/Persistence/Repositories/ElementoComponenteRepository.ts`
- `Infrastructure/src/Persistence/Sequelize/associations.ts`
- `Infrastructure/src/Persistence/Migrations/20260624120000-expand-elemento-componente-variacion.ts`
- `API/src/CompositionRoot/ApiContainer.ts`
- `API/src/Controllers/ElementoComponenteController.ts`
- `API/src/Routes/routes.ts`
- `API/src/Swagger/schemas.ts`

Si se transfiere compilado, incluir:

- `Domain/dist`
- `Application/dist`
- `Infrastructure/dist`
- `API/dist`

### FE Fase 1

No requiere cambios obligatorios.

Validar que el FE actual siga funcionando:

- Carga listado de componentes.
- Carga detalle de componente.
- Consulta `GET /elementos-componente?id_componente=X`.
- Crea elemento componente enviando `id_componente` como hasta ahora.

### Orden Fase 1

1. Backup DB.
2. Subir BE Fase 1.
3. Ejecutar `npm run build` en el servidor si corresponde.
4. Ejecutar migracion Fase 1.
5. Reiniciar BE.
6. Validar DB post-migracion.
7. Validar endpoints existentes.
8. Validar endpoints nuevos.
9. Validar FE.

## Fase 2 - Contract

Ejecutar solo despues de validar Fase 1.

### Migracion DB

Archivo:

```txt
Infrastructure/src/Persistence/PendingMigrations/20260624130000-contract-elemento-componente-drop-id-componente.ts
```

Esta migracion queda fuera de `Infrastructure/src/Persistence/Migrations` para que `npm run db:migrate` no ejecute Fase 1 y Fase 2 juntas.

Cuando se decida ejecutar Fase 2, mover el archivo a:

```txt
Infrastructure/src/Persistence/Migrations/20260624130000-contract-elemento-componente-drop-id-componente.ts
```

Luego correr `npm run db:migrate`.

Hace:

- Elimina FK vieja de `dbo.elemento_componente.id_componente`.
- Elimina indice viejo `IX_elemento_componente_id_componente`.
- Elimina columna `dbo.elemento_componente.id_componente`.

### BE

No requiere cambios adicionales.

Se mantiene compatibilidad del request `POST /elementos-componente` con `id_componente` opcional. Aunque la columna vieja ya no exista, el BE usa ese valor solo para crear la asignacion especifica en la tabla nueva.

### FE Fase 2

No requiere cambios obligatorios para completar la limpieza DB.

Cambios futuros recomendados:

- Crear elemento sin depender de `id_componente`.
- Llamar despues a `PUT /api/elementos-componente/{id}/asignaciones`.
- Agregar UI para asignacion global por variacion.
- Agregar UI para asignacion especifica por componente.
- Agregar edicion de `metadata`.
- Agregar edicion de `contrato_minimo` si corresponde.

## Queries Post Migracion Fase 1

```sql
SELECT
  s.name AS schema_name,
  t.name AS table_name,
  c.name AS column_name,
  ty.name AS data_type,
  c.max_length,
  c.is_nullable
FROM sys.tables t
INNER JOIN sys.schemas s ON s.schema_id = t.schema_id
INNER JOIN sys.columns c ON c.object_id = t.object_id
INNER JOIN sys.types ty ON ty.user_type_id = c.user_type_id
WHERE s.name = 'dbo'
  AND t.name IN ('elemento_componente', 'elemento_componente_variacion')
ORDER BY t.name, c.column_id;
```

```sql
SELECT
  i.name AS index_name,
  i.is_unique,
  i.has_filter,
  i.filter_definition,
  c.name AS column_name,
  ic.key_ordinal
FROM sys.indexes i
INNER JOIN sys.index_columns ic
  ON ic.object_id = i.object_id
 AND ic.index_id = i.index_id
INNER JOIN sys.columns c
  ON c.object_id = ic.object_id
 AND c.column_id = ic.column_id
WHERE OBJECT_SCHEMA_NAME(i.object_id) = 'dbo'
  AND OBJECT_NAME(i.object_id) = 'elemento_componente_variacion'
ORDER BY i.name, ic.key_ordinal;
```

```sql
SELECT
  fk.name AS foreign_key_name,
  OBJECT_NAME(fk.parent_object_id) AS parent_table,
  pc.name AS parent_column,
  OBJECT_NAME(fk.referenced_object_id) AS referenced_table,
  rc.name AS referenced_column
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc
  ON fkc.constraint_object_id = fk.object_id
INNER JOIN sys.columns pc
  ON pc.object_id = fkc.parent_object_id
 AND pc.column_id = fkc.parent_column_id
INNER JOIN sys.columns rc
  ON rc.object_id = fkc.referenced_object_id
 AND rc.column_id = fkc.referenced_column_id
WHERE OBJECT_SCHEMA_NAME(fk.parent_object_id) = 'dbo'
  AND OBJECT_NAME(fk.parent_object_id) IN ('elemento_componente', 'elemento_componente_variacion')
ORDER BY parent_table, fk.name;
```

## Queries Post Migracion Fase 2

```sql
SELECT
  c.name AS column_name
FROM sys.columns c
WHERE c.object_id = OBJECT_ID('dbo.elemento_componente')
  AND c.name = 'id_componente';
```

La query debe devolver 0 filas.

```sql
SELECT
  name,
  type_desc
FROM sys.objects
WHERE name LIKE '%elemento_componente_variacion%'
   OR name LIKE '%elemento_componente_id_componente%';
```
