# Plan BE - Elemento Componente por Variacion

## Objetivo

Modificar el backend para que un `elemento_componente` pueda aplicarse a una o muchas `tipo_variacion`.

La relacion actual es directa:

```txt
elemento_componente -> componente
```

La nueva relacion sera:

```txt
elemento_componente -> tipo_variacion
elemento_componente -> tipo_variacion + componente opcional
```

Esto permite:

- Aplicar un elemento a todos los componentes de una variacion.
- Aplicar un elemento solo a un componente especifico dentro de una variacion.
- Combinar relaciones globales y especificas.
- Hacer prevalecer la relacion especifica cuando exista duplicado para el mismo elemento.

Nota de nomenclatura: en el codigo actual el identificador del elemento se llama `id_elemento`. Cuando se habla de `id_elemento_componente`, se refiere al `id_elemento` de `elemento_componente`.

## Decision API

Se implementaran endpoints separados para administrar asociaciones.

El endpoint de `elementos-componente` queda enfocado en crear, editar, listar y eliminar el elemento base.

Las asociaciones se administraran con endpoints propios:

```http
GET /api/elementos-componente/{id}/asignaciones
PUT /api/elementos-componente/{id}/asignaciones
```

Se mantiene el endpoint existente:

```http
GET /api/elementos-componente?id_componente=10
```

Este endpoint devolvera los elementos aplicables al componente, incluyendo relaciones globales y especificas.

## Nueva Tabla

Crear tabla:

```txt
dbo.elemento_componente_variacion
```

Campos:

```ts
id_elemento_componente_variacion: number;
id_elemento: number;
id_tipo_variacion: number;
id_componente: number | null;
metadata: Record<string, unknown>;
```

Reglas:

- `id_componente = null`: aplica a todos los componentes de esa `id_tipo_variacion`.
- `id_componente = X`: aplica solo al componente `X` dentro de esa `id_tipo_variacion`.

## Constraints E Indices

No se usara PK compuesta con `id_componente` porque el campo puede ser `NULL`.

Se usara PK surrogate:

```sql
id_elemento_componente_variacion INT IDENTITY PRIMARY KEY
```

Foreign keys:

```sql
id_elemento -> elemento_componente.id_elemento
id_tipo_variacion -> tipo_variacion.id_tipo_variacion
id_componente -> componente.id_componente
```

Validaciones de unicidad requeridas:

- No puede existir mas de una asociacion global con el mismo `id_elemento` y `id_tipo_variacion`, es decir con `id_componente IS NULL`.
- No puede existir mas de una asociacion especifica con el mismo `id_elemento`, `id_tipo_variacion` e `id_componente`.

Estas validaciones se implementaran con indices unicos filtrados:

```sql
CREATE UNIQUE INDEX UX_elemento_componente_variacion_global
ON dbo.elemento_componente_variacion (id_elemento, id_tipo_variacion)
WHERE id_componente IS NULL;
```

```sql
CREATE UNIQUE INDEX UX_elemento_componente_variacion_especifica
ON dbo.elemento_componente_variacion (id_elemento, id_tipo_variacion, id_componente)
WHERE id_componente IS NOT NULL;
```

Indices de lectura recomendados:

```sql
CREATE INDEX IX_elemento_componente_variacion_componente
ON dbo.elemento_componente_variacion (id_componente);
```

```sql
CREATE INDEX IX_elemento_componente_variacion_tipo_variacion
ON dbo.elemento_componente_variacion (id_tipo_variacion);
```

## Metadata

La tabla de asociacion tendra un campo:

```ts
metadata: Record<string, unknown>;
```

En SQL Server se guardara como:

```sql
NVARCHAR(MAX)
```

Con constraint:

```sql
ISJSON(metadata) = 1
```

Default:

```json
{}
```

## Contrato Minimo Del Elemento

Agregar en `elemento_componente` un campo JSON que defina el contrato minimo requerido para crear una asociacion.

Nombre propuesto:

```ts
contrato_minimo
```

Tipo dominio:

```ts
contrato_minimo: ContratoMinimoElemento | null;
```

Uso:

- Define los requisitos que debe cumplir `metadata` al asociar el elemento.
- La validacion ocurre al crear o reemplazar asociaciones.
- Si `contrato_minimo` es `null` o no contiene reglas, no se exige metadata especifica.

`contrato_minimo` sera una estructura propia reducida, no JSON Schema completo.

Estructura inicial propuesta:

```ts
type ContratoMinimoElemento = {
  required?: string[];
  fields?: Record<
    string,
    {
      type: "string" | "number" | "boolean" | "object" | "array";
      nullable?: boolean;
    }
  >;
};
```

Ejemplo:

```json
{
  "required": ["selector", "label"],
  "fields": {
    "selector": {
      "type": "string"
    },
    "label": {
      "type": "string"
    },
    "maxItems": {
      "type": "number",
      "nullable": true
    }
  }
}
```

Metadata valida:

```json
{
  "selector": ".hero-title",
  "label": "Titulo principal",
  "maxItems": 1
}
```

Metadata invalida:

```json
{
  "selector": ".hero-title"
}
```

Motivo:

```txt
Falta el campo requerido: label
```

Validaciones del contrato reducido:

- `required` debe ser un array de strings si existe.
- `fields` debe ser un objeto si existe.
- Cada campo declarado en `required` debe existir en `metadata`.
- Cada campo presente en `fields` debe cumplir el `type` declarado cuando venga informado en `metadata`.
- Si un campo es `null`, solo es valido cuando `nullable` sea `true`.
- No se validaran reglas avanzadas como `minLength`, `maxLength`, `pattern`, `enum`, `minimum` o `maximum` en la primera version.

## Regla De Prevalencia

Para `GET /api/elementos-componente?id_componente=X`:

1. Buscar el componente `X`.
2. Obtener su `id_tipo_variacion`.
3. Buscar elementos globales con `id_tipo_variacion = componente.id_tipo_variacion` y `id_componente IS NULL`.
4. Buscar elementos especificos con `id_componente = X`.
5. Combinar resultados.
6. Si el mismo `id_elemento` aparece global y especifico, devolver solo el especifico.

La metadata especifica prevalece sobre la global.

No se hara merge de metadata en esta primera implementacion.

## Migraciones DB

La implementacion se divide en dos migraciones.

Migracion 1 - Expand:

1. Agregar columna `contrato_minimo` a `dbo.elemento_componente`.
2. Crear tabla `dbo.elemento_componente_variacion`.
3. Agregar FKs.
4. Agregar indices de lectura.
5. Agregar indices unicos filtrados para relaciones globales y especificas.
6. Agregar constraints JSON para `metadata` y `contrato_minimo`.
7. Cambiar `elemento_componente.id_componente` a nullable.
8. Mantener `elemento_componente.id_componente` para compatibilidad temporal.

Migracion 2 - Contract:

1. Eliminar FK/index actual de `elemento_componente.id_componente`.
2. Eliminar columna `id_componente` de `elemento_componente`.

La migracion contract queda versionada en `Infrastructure/src/Persistence/PendingMigrations` para evitar que `npm run db:migrate` ejecute ambas fases juntas. Para ejecutarla, moverla manualmente a `Infrastructure/src/Persistence/Migrations` despues de validar Fase 1.

No se requiere backfill porque actualmente no hay datos en `elemento_componente`.

Para dropear la FK actual de `elemento_componente.id_componente`, usar SQL dinamico porque la FK fue creada inline y puede no tener nombre estable.

## Cambios Domain

Actualizar:

```txt
Domain/src/Entities/ElementoComponente.ts
```

Eliminar:

```ts
id_componente
```

Agregar:

```ts
contrato_minimo: ContratoMinimoElemento | null;
```

Crear entidad nueva:

```txt
Domain/src/Entities/ElementoComponenteVariacion.ts
```

Campos:

```ts
id_elemento_componente_variacion: number;
id_elemento: number;
id_tipo_variacion: number;
id_componente: number | null;
metadata: Record<string, unknown>;
```

## Cambios Application

Actualizar DTOs de `ElementoComponente`:

- `ICreateElementoComponenteDTO`
- `IUpdateElementoComponenteDTO`
- `IPatchElementoComponenteDTO`
- `IElementoComponenteDTO`
- `ElementoComponenteDTOMapper`

Eliminar `id_componente` de create/update/patch del elemento base.

Agregar `contrato_minimo`.

Crear DTOs para asignaciones:

```txt
IElementoComponenteAsignacionDTO
IReplaceElementoComponenteAsignacionesDTO
```

Ejemplo:

```ts
{
  asignaciones: [
    {
      id_tipo_variacion: 1,
      id_componente: null,
      metadata: {}
    },
    {
      id_tipo_variacion: 1,
      id_componente: 10,
      metadata: {
        selector: ".hero-title"
      }
    }
  ]
}
```

Crear use cases:

```txt
GetElementoComponenteAsignacionesService
ReplaceElementoComponenteAsignacionesService
```

Validaciones:

- El elemento debe existir.
- La variacion debe existir.
- Si `id_componente` viene informado, el componente debe existir.
- Si `id_componente` viene informado, debe pertenecer a la misma `id_tipo_variacion`.
- `metadata` debe cumplir `contrato_minimo`.
- No puede existir mas de una asignacion global en el request para el mismo `id_elemento` y `id_tipo_variacion`.
- No puede existir mas de una asignacion especifica en el request para el mismo `id_elemento`, `id_tipo_variacion` e `id_componente`.

## Cambios Infrastructure

Crear modelo Sequelize:

```txt
ElementoComponenteVariacionModel
```

Actualizar:

```txt
ElementoComponenteModel
```

Agregar campo:

```ts
contrato_minimo
```

Actualizar associations:

```ts
ElementoComponenteModel.hasMany(ElementoComponenteVariacionModel, {
  foreignKey: "id_elemento",
  as: "asignaciones",
});

ElementoComponenteVariacionModel.belongsTo(ElementoComponenteModel, {
  foreignKey: "id_elemento",
  as: "elemento",
});

ElementoComponenteVariacionModel.belongsTo(TipoVariacionModel, {
  foreignKey: "id_tipo_variacion",
  as: "tipoVariacion",
});

ElementoComponenteVariacionModel.belongsTo(ComponenteModel, {
  foreignKey: "id_componente",
  as: "componente",
});
```

Actualizar repositories:

```txt
ElementoComponenteCommandRepository
ElementoComponenteQueryRepository
ElementoComponenteRepository
```

Crear metodos para asignaciones:

```ts
getAsignacionesByElemento(id_elemento: number)
replaceAsignaciones(id_elemento: number, asignaciones: ElementoComponenteVariacion[])
```

Actualizar `getByComponente(id_componente)` para usar la nueva tabla.

## Cambios API

Actualizar controller:

```txt
API/src/Controllers/ElementoComponenteController.ts
```

Cambiar `POST /elementos-componente`:

- Ya no requiere `id_componente`.
- Acepta `contrato_minimo`.

Cambiar `PUT /elementos-componente/{id}`:

- Ya no requiere `id_componente`.
- Acepta `contrato_minimo`.

Cambiar `PATCH /elementos-componente/{id}`:

- Ya no acepta `id_componente`.
- Acepta `contrato_minimo`.

Agregar endpoints:

```http
GET /elementos-componente/{id}/asignaciones
PUT /elementos-componente/{id}/asignaciones
```

Actualizar Swagger schemas.

## Impacto En Landing Render

`GenerateLandingIndexService` usa:

```ts
elementoComponenteRepository.getByComponente(componente.id_componente)
```

No deberia necesitar cambios si el repositorio mantiene la misma firma.

El nuevo comportamiento quedara encapsulado en `getByComponente`.

## Impacto FE

El FE actual usa:

```http
POST /elementos-componente
GET /elementos-componente?id_componente=...
PATCH /elementos-componente/{id}
```

Impacto esperado:

- Crear elemento ya no deberia mandar `id_componente`.
- Para asociar el elemento a variaciones/componentes, debera llamar al nuevo endpoint de asignaciones.
- La consulta por componente puede mantenerse igual.

## Testing

Actualizar tests existentes de:

```txt
Tests/src/Application/DTOs/ElementoComponente
Tests/src/Application/Services/ElementoComponente
Tests/src/Domain/Entities
```

Agregar tests para:

- Crear elemento con `contrato_minimo`.
- Actualizar elemento con `contrato_minimo`.
- Reemplazar asignaciones.
- Validar metadata contra `contrato_minimo`.
- Rechazar `id_componente` que no pertenece a `id_tipo_variacion`.
- Rechazar asociacion global duplicada para el mismo `id_elemento` y `id_tipo_variacion`.
- Rechazar asociacion especifica duplicada para el mismo `id_elemento`, `id_tipo_variacion` e `id_componente`.
- `getByComponente` devuelve global + especifica.
- Si hay duplicado por `id_elemento`, prevalece la especifica.
- Eliminar elemento elimina asignaciones por cascade.

## Verificacion

Comandos:

```bash
npm run build
npm run tests:test
```

Si corresponde aplicar migracion:

```bash
npm run db:migrate
```

## Decisiones Confirmadas

- `id_variacion` se interpreta como `id_tipo_variacion`.
- No hay datos existentes en `elemento_componente`, por lo que no se requiere backfill.
- Las asociaciones se administraran con endpoints separados.
- Si existe relacion global y especifica para el mismo elemento, ambas se consideran, pero ante duplicado prevalece la especifica.
- `contrato_minimo` sera una estructura propia reducida, no JSON Schema completo.

## Decisiones Pendientes

Definir si el endpoint `GET /api/elementos-componente/{id}` debe incluir las asignaciones embebidas o si solo se obtendran por `GET /api/elementos-componente/{id}/asignaciones`.

Definir si `GET /api/elementos-componente?id_componente=X` debe devolver la `metadata` de la asociacion aplicable junto al elemento base.
