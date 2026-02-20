# Backend - Sistema de Reservas

API REST con Node.js, Express y TypeORM (PostgreSQL).

## Requisitos

- Node.js 20+
- PostgreSQL

## Instalacion

```bash
cp .env.example .env    # configurar variables de entorno
npm install
npm run dev             # inicia en http://localhost:3000
```

## Scripts

| Comando         | Descripcion                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Servidor de desarrollo         |
| `npm run build` | Compila TypeScript a `dist/`   |
| `npm start`     | Ejecuta la build de produccion |

## Base de datos (Docker)

```bash
docker run -d --name restaurant-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=restaurant \
  -p 5432:5432 \
  postgres:16-alpine
```

## Docker (backend)

```bash
docker build -t restaurant-backend .
docker run -p 3000:3000 --env-file .env restaurant-backend
```

## Estructura

```
src/
  config/        # DataSource de TypeORM
  controllers/   # Controladores HTTP
  entities/      # Entidades TypeORM
  repositories/  # Capa de acceso a datos
  routes/        # Definicion de rutas
  services/      # Logica de negocio
  index.ts       # Punto de entrada
```
