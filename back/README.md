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
//////////////////////////////////////////////////////
Sistema de Reservas — Instrucciones de Ejecución
Requisitos

Node.js 20+
PostgreSQL 14+

1. Configurar variables de entorno
Crear un archivo .env en la carpeta back/ con el siguiente contenido:
env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=restaurant
PORT=3000

2. Instalar dependencias
bash
cd back
npm install

3. Crear la base de datos
Desde pgAdmin o psql, crear una base de datos llamada restaurant.

4. Ejecutar migraciones
bash
npm run migration:run

5. Cargar datos de prueba (opcional)
bash
npm run seed

6. Iniciar el servidor
bash
npm run dev
El servidor queda disponible en http://localhost:3000.