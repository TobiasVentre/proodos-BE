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

Opcionales:
- `PORT` (default `8000`)
- `CORS_ORIGIN` (default `*`)
- `ENABLE_SWAGGER` (`true|false`)
- `DB_ENCRYPT` (`true|false`)
- `DB_TRUST_CERT` (`true|false`)

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
