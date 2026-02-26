# Frontend - Sistema de Reservas

SPA con React, React Router y Axios. Scaffolded con Vite.

## Requisitos

- Node.js 20+

## Instalacion

```bash
npm install
npm run dev     # inicia en http://localhost:5173
```

## Scripts

| Comando         | Descripcion                 |
| --------------- | --------------------------- |
| `npm run dev`   | Servidor de desarrollo Vite |
| `npm run build` | Build de produccion         |
| `npm run lint`  | Ejecuta ESLint              |

## Estructura

```
src/
  components/    # Componentes reutilizables (Navbar, etc.)
  pages/         # Vistas/paginas de la app
  services/      # Cliente API (Axios)
  App.tsx        # Rutas principales
  main.tsx       # Punto de entrada
```
//////////////////////////////////////////////////////////////////
Frontend
1. Instalar dependencias
bash
cd front
npm install

2. Iniciar la aplicación
bas
hnpm run dev
La aplicación queda disponible en http://localhost:5173.

El frontend espera que el backend esté corriendo en http://localhost:3000.


Orden de ejecución recomendado

Levantar PostgreSQL
Correr migraciones y seed del backend
Iniciar el servidor backend (npm run dev en back/)
Iniciar el frontend (npm run dev en front/)