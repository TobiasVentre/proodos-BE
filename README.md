# Proodos Service

Monorepo Node.js + TypeScript con workspaces:
- `Domain`
- `Application`
- `Infrastructure`
- `API`

## Requisitos
- Node.js 20+ (recomendado 22 LTS)
- npm 10+
- Acceso a SQL Server

## Variables de entorno
1. Crear `.env` en la raíz (o usar variables del sistema).
2. Tomar como base `.env.example`.

Variables mínimas requeridas:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_ISSUER`
- `JWT_AUDIENCE`

Opcionales:
- `PORT` (default `8000`)
- `CORS_ORIGIN` (default `*`)
- `ENABLE_SWAGGER` (`true|false`)
- `DB_ENCRYPT` (`true|false`)
- `DB_TRUST_CERT` (`true|false`)
- `JWT_ACCESS_ALGORITHM` (default `HS256`)

## Comandos principales
- Instalar dependencias:
```bash
npm ci
```

- Build completo:
```bash
npm run build
```

- Ejecutar migraciones:
```bash
npm run db:migrate
```

- Levantar API:
```bash
npm run start
```

## Deploy sugerido (servidor)
```bash
git pull origin main
npm ci
npm run build
npm run db:migrate
npm run start
```

Healthcheck:
- `GET /health`

Swagger (si `ENABLE_SWAGGER=true`):
- `/docs`

Uso con token JWT:
- Obtener el token desde Auth.
- Abrir `/docs`.
- Hacer click en `Authorize`.
- Pegar solo el token JWT, sin escribir `Bearer `.
- Confirmar y ejecutar los endpoints de `/api`; Swagger enviará `Authorization: Bearer <token>` automáticamente.

Contrato mínimo esperado del access token:
- `sub`: identificador del usuario autenticado.
- `roles`: arreglo no vacío de roles.
- `token_use`: debe ser `access`.
- `iss`: issuer configurado en `JWT_ISSUER`.
- `aud`: audience configurado en `JWT_AUDIENCE`.

Política operativa actual:
- temporalmente, todos los endpoints de `/api` requieren un usuario con rol `admin`.
- la matriz fina por recurso quedará sujeta a la definición funcional pendiente.
