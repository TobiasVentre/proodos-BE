# Proodos BE Architecture

## Objetivo

Este documento fija las decisiones arquitectonicas acordadas para `Proodos - BE`.
La intencion es usarlo como referencia persistente para nuevos endpoints y para refactors
de los modulos ya existentes.

## Estructura de la solucion

- `Domain`: entidades y reglas de dominio.
- `Application`: contratos, DTOs, puertos, mappers y casos de uso.
- `Infrastructure`: persistencia, modelos ORM, mappers de infraestructura y repositorios.
- `API`: controllers, rutas, wiring y exposicion HTTP.
- `Tests`: pruebas unitarias y de integracion liviana del backend.

## Convenciones estructurales

### Source layout

- Todo archivo `.ts` debe vivir dentro de una carpeta `src`.
- Todo archivo compilado `.js` debe generarse dentro de una carpeta `dist`.
- Cada workspace debe declarar `rootDir: "src"` y `outDir: "dist"`.
- No se deben dejar archivos fuente `.js` mezclados con `.ts`.

### Application layer

- Cada caso de uso debe tener un solo contrato de entrada.
- Cada accion debe tener una sola implementacion de servicio.
- No se mezclan `Service` con `CommandHandler` o `QueryHandler` para el mismo endpoint.
- Los servicios deben implementar explicitamente su puerto de aplicacion.
- Los controllers consumen puertos, no repositorios ni modelos ORM.

### DTOs y mapeo

- Los DTOs pertenecen a `Application/src/DTOs`.
- El mapeo `DTO -> Entity` debe ser explicito.
- Los mappers de DTO deben vivir junto al DTO o en su carpeta funcional.
- No se permite `dto as Entity`.
- Las validaciones de formato basicas deben estar centralizadas en el mapper o en un
  servicio de aplicacion reutilizable.

### Repositorios

- `Application` define las interfaces de repositorio.
- `Infrastructure` implementa esas interfaces.
- Los repositorios deben devolver una entidad valida o lanzar un error semantico.
- No se permite devolver `null as any`.
- Si una actualizacion no encuentra el registro, se debe lanzar `NotFoundError`.

### Controllers

- Deben ser finos.
- Deben validar parametros HTTP y delegar la logica al caso de uso.
- No deben contener logica de negocio.
- No deben usar `console.log` directo.
- El logging debe pasar por `ILogger`.
- Las validaciones HTTP repetidas deben salir de helpers compartidos.
- Las respuestas HTTP deben usar un formato comun a traves de helpers compartidos.

### Errores y logging

- Los errores de aplicacion deben usar las clases de error del proyecto.
- El logging debe pasar por `ILogger`.
- El controller solo traduce input/output HTTP y delega los errores al middleware.
- El bootstrap de `API`, la carga de entorno y la inicializacion de infraestructura tambien
  deben usar `ILogger` cuando corresponda.
- Los archivos de configuracion consumidos por tooling externo, como `sequelize.config.ts`,
  no deben escribir `console.*` arbitrario; si no pueden recibir `ILogger`, deben permanecer
  silenciosos.

### Authentication y authorization

- `Proodos - Auth` es la fuente de verdad para autenticacion y autorizacion.
- `Proodos - BE` no emite tokens; solo valida JWT firmados por `Auth`.
- El payload esperado del token es un objeto con al menos `sub` y `roles`.
- Todo endpoint bajo `/api` debe quedar protegido por middleware JWT.
- `/health` y `/docs` permanecen publicos.
- La autorizacion por roles debe resolverse con middleware dedicado, por ejemplo
  `requireAnyRole`, sin llevar esa logica al controller.
- `BE` y `Auth` deben compartir el mismo `JWT_SECRET` o el par de llaves equivalente si a
  futuro se migra a firma asimetrica.

## Convenciones de naming

### Interfaces

- Toda interface debe comenzar con `I`.
- Esto aplica a:
  - interfaces de repositorio
  - puertos de casos de uso
  - DTOs definidos como `interface`
  - interfaces auxiliares compartidas
- Los nombres de archivo que contienen contratos de interface tambien deben comenzar con `I`.
- Ejemplos:
  - `ICreateLandingPageDTO.ts`
  - `ILandingPageUseCases.ts`
  - `ILandingComponenteDTO.ts`
- En archivos agrupados, el basename debe representar el grupo contractual con prefijo `I`.
  Ejemplo: `ILandingPageUseCases.ts`.

### Casos de uso

- El nombre del puerto debe describir una accion unica.
- Ejemplos:
  - `ICreateLandingPageUseCase`
  - `IGetLandingPageByIdUseCase`
  - `IPatchLandingPageUseCase`

### Servicios

- El nombre concreto debe cerrar con `Service`.
- Ejemplos:
  - `CreateLandingPageService`
  - `GetLandingPageByIdService`

## Endpoints de referencia

- `LandingPage`: referencia de CRUD basico con DTO + mapper + service + repository.
- `LandingComponente`: referencia de relacion idempotente entre agregados.
- `Componente`: referencia de CRUD con `PUT` real, mapper explicito y relacion jerarquica
  padre-hijo con DTO y resultado explicitos.

### Patron validado en LandingPage

- Un solo DTO por accion.
- Un solo service por accion.
- Mapper explicito en `Application/src/DTOs/LandingPage`.
- `Service` implementando puerto.
- Controller consumiendo puertos.
- Repositorio arrojando `NotFoundError` cuando corresponde.

### Patron validado en LandingComponente

- Un solo servicio de asignacion.
- Contrato idempotente unico para `assign`: retorno `{ data, existed }`.
- DTO compartido para operaciones sobre la relacion `landing-componente`.
- Mapper explicito en `Application/src/DTOs/LandingComponente`.
- Eliminacion de variantes duplicadas de servicio y DTOs muertos.
- Infraestructura alineada con constructor `ILogger`, `command/query repositories` y
  logging consistente.

### Patron validado en Componente

- `Create` y `Update` usan mapper explicito en `Application/src/DTOs/Componente`.
- `Update` existe como caso de uso publico real y no como codigo muerto.
- Todos los servicios del modulo implementan explicitamente su puerto.
- La relacion padre-hijo usa DTO compartido y resultado explicito.
- El arbol reutiliza el tipo contractual definido en puertos.

### Semantica validada en Plan

- `Plan` convive en dos contratos sobre la misma tabla: `simple` y `full`.
- El contrato `simple` representa el caso de uso historico del plan base.
- El contrato `full` representa la carga extendida derivada del Excel y del proceso comercial.
- No se deben fusionar ambos contratos en un solo DTO ni en un solo endpoint.
- Reglas por endpoint:
  - `POST /planes`: crea un plan base y persiste en `null` los campos extendidos de la tabla.
  - `PUT /planes/:id`: reemplaza solo el contrato base y no debe pisar los campos extendidos.
  - `PATCH /planes/:id`: actualiza parcialmente solo el contrato base.
  - `POST /planes/full`: crea un plan full y normaliza `undefined -> null` para campos omitidos.
  - `PUT /planes/:id/full`: reemplaza el contrato full y normaliza `undefined -> null` para campos omitidos.
  - `PATCH /planes/:id/full`: actualiza parcialmente el contrato full y deja intactos los campos omitidos.
- El mapper explicita la semantica de normalizacion.
- El repositorio aplica la persistencia correspondiente sin introducir contratos alternativos.

### Patron validado en API Controllers

- Todos los controllers reciben `ILogger` por dependencia.
- La validacion de ids y campos requeridos se centraliza en `ControllerHelpers`.
- La deteccion de `not found` se centraliza en `ControllerHelpers`.
- Las respuestas se unifican mediante `respondOk`, `respondCreated` y `respondNoContent`.
- Los controllers quedan reducidos a traducir HTTP y delegar a casos de uso.

## Checklist para nuevos endpoints o refactors

1. Crear DTOs en `Application/src/DTOs/<Modulo>`.
2. Crear mapper explicito `DTO -> Entity` cuando aplique.
3. Definir puertos en `Application/src/Ports`.
4. Implementar un solo `Service` por accion.
5. Inyectar interfaces de repositorio, nunca repositorios concretos en controllers.
6. Mantener `src/dist` consistente en todos los workspaces.
7. Verificar que las interfaces sigan la convencion `I*`.
8. Correr `npm run build`.
9. Correr tests focalizados del modulo afectado.
10. Si el cambio toca contratos compartidos, correr la suite completa en `Tests`.
11. Si el cambio expone endpoints bajo `/api`, validar tambien su politica de autenticacion.

## Regla para replicacion futura

Cuando exista duda entre dos variantes, se debe elegir la opcion que:

1. reduzca duplicacion
2. haga explicitos los contratos
3. mantenga los controllers finos
4. mantenga el dominio aislado de detalles HTTP y ORM
5. permita testear el caso de uso sin infraestructura real

## Standardization Status

### 1. Infraestructura inconsistente

- No quedan desalineaciones fuertes de composicion entre los repositorios principales.
- Mantener como regla que todo repositorio nuevo siga:
  - constructor con `ILogger`
  - separacion `command/query` cuando combine escrituras y lecturas
  - logging consistente en las operaciones expuestas

### 2. Plan estandarizado

- La convivencia `simple/full` queda formalmente soportada y documentada.
- No queda una decision abierta sobre la semantica de `Plan`.
- Los cambios futuros sobre `Plan` deben respetar esta separacion contractual.
