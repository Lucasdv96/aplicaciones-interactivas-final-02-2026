# 🧩 Trabajo Práctico Final

# Sistema de Gestión de Reservas para Restaurante

------------------------------------------------------------------------

## 📌 Objetivo

Desarrollar una aplicación fullstack que permita gestionar las mesas y
reservas de un restaurante.

El sistema deberá permitir:

-   Registrar mesas y su capacidad
-   Definir turnos disponibles por día
-   Registrar reservas para mesas en turnos específicos
-   Cancelar reservas
-   Consultar disponibilidad
-   Generar un reporte simple de ocupación

------------------------------------------------------------------------

## 🛠 Tecnologías obligatorias

### Backend

-   Node.js
-   Express
-   TypeORM
-   Base de datos relacional (MySQL o PostgreSQL)
-   Arquitectura en capas:
    -   Controllers
    -   Services
    -   Repositories
-   Migraciones de base de datos con TypeORM:
    -   Las tablas deben crearse mediante migraciones, no con `synchronize: true`
    -   Scripts en package.json para generar y ejecutar migraciones:
        -   `npm run migration:generate` — genera una migración a partir de cambios en las entidades
        -   `npm run migration:run` — ejecuta las migraciones pendientes
        -   `npm run migration:revert` — revierte la última migración ejecutada
    -   Las migraciones deben almacenarse en `src/migrations/`
-   Script de datos de prueba (seed):
    -   `npm run seed` — ejecuta un script que inicializa la base de datos con datos de prueba
    -   Datos mínimos del seed:
        -   4 mesas (capacidades variadas, al menos una con status OUT_OF_SERVICE)
        -   3 turnos para la fecha de hoy (por ejemplo: 12:00–14:00, 18:00–20:00, 20:00–22:00)
        -   2 reservas de ejemplo (al menos una CONFIRMED y una CANCELLED)
    -   El script debe ser idempotente: si se ejecuta más de una vez, no debe duplicar datos

### Frontend

-   React
-   React Router
-   useState
-   useEffect
-   Fetch o Axios para consumir la API

------------------------------------------------------------------------

# 📚 Dominio del Problema

Un restaurante necesita un sistema para administrar:

-   Sus mesas
-   Los turnos disponibles en cada día
-   Las reservas realizadas por los clientes
-   El nivel de ocupación del restaurante en una fecha determinada

No se requiere autenticación de usuarios.

El sistema representa únicamente la gestión interna del restaurante.

------------------------------------------------------------------------

# 🗂 Modelo de Datos

## 1️⃣ Table (Mesa)

### Atributos

-   id
-   number (único)
-   capacity (cantidad máxima de personas)
-   status (AVAILABLE \| OUT_OF_SERVICE)

### Reglas

-   No puede haber dos mesas con el mismo número.
-   La capacidad debe ser mayor a 0.
-   Si una mesa está OUT_OF_SERVICE no puede recibir reservas.

------------------------------------------------------------------------

## 2️⃣ Shift (Turno)

### Atributos

-   id
-   date
-   startTime
-   endTime

### Reglas

-   No pueden crearse turnos en fechas pasadas.
-   No pueden existir turnos solapados en la misma fecha.
    -   Ejemplo inválido: 20:00--22:00 y 21:00--23:00
    -   Ejemplo válido: 18:00--20:00 y 20:00--22:00

------------------------------------------------------------------------

## 3️⃣ Reservation (Reserva)

### Atributos

-   id
-   customerName
-   partySize
-   status (CONFIRMED \| CANCELLED)
-   createdAt

### Relaciones

-   Pertenece a una mesa
-   Pertenece a un turno

------------------------------------------------------------------------

# 📏 Reglas de Negocio (Obligatorias en Services)

## 1️⃣ Mesa fuera de servicio

No se puede crear una reserva para una mesa con estado OUT_OF_SERVICE.

## 2️⃣ Capacidad máxima

Si partySize > capacity de la mesa → la reserva debe rechazarse.

## 3️⃣ Una reserva confirmada por mesa y turno

Para una misma mesa y turno solo puede existir una reserva con estado
CONFIRMED.

Si la anterior está CANCELLED, se puede crear una nueva.

## 4️⃣ Turnos pasados

No se pueden crear reservas en turnos cuya fecha/hora ya haya pasado.

## 5️⃣ Cancelación

Cancelar una reserva cambia su estado a CANCELLED (no se elimina). Una
vez cancelada, la mesa queda disponible para ese turno.

## 6️⃣ Número de mesa único

No puede repetirse el campo number.

## 7️⃣ Capacidad válida

No se pueden crear mesas con capacidad 0 o negativa.

## 8️⃣ Turnos sin solapamiento

En la misma fecha no pueden existir turnos con horarios superpuestos.

------------------------------------------------------------------------

# 🔌 API mínima requerida

## Mesas (/tables) endpoints

-   Creación
-   Listado
-   Actualización

## Turnos (/shifts) endpoints

-   Creación
-   Listado

## Reservas (/reservations) endpoints

-   Creación
-   Listado
-   Actualización

## Reporte

- Listado (sugerencia: GET /reports/occupancy?date=YYYY-MM-DD)

Debe devolver: - totalTables - reservedTables - availableTables -
occupancyPercentage

Cálculo: (reservedTables / totalTables) \* 100

------------------------------------------------------------------------

# 🎨 Frontend

## Vistas mínimas

1.  Listado de mesas
2.  Listado de turnos
3.  Crear reserva
4.  Listado de reservas
5.  Reporte de ocupación

## Componentes mínimos

-   Navbar
-   TableList
-   ShiftList
-   ReservationForm
-   ReservationList
-   OccupancyReport

Debe existir separación clara entre componentes.

------------------------------------------------------------------------

# 📂 Entregables

Repositorio con: - /backend - /frontend - README con instrucciones de
ejecución

------------------------------------------------------------------------

# ❓ Preguntas de defensa

Cada proyecto incluye un archivo `PREGUNTAS.md` con preguntas sobre las
decisiones técnicas tomadas durante la implementación:

-   `/backend/PREGUNTAS.md` — Preguntas sobre arquitectura, manejo de
    errores HTTP, validaciones, TypeORM Y migraciones.
-   `/frontend/PREGUNTAS.md` — Preguntas sobre componentes, estado,
    formularios, comunicación con la API y ruteo.

**El alumno debe responder todas las preguntas en el mismo archivo**,
debajo de cada pregunta. Las respuestas deben ser breves, concretas y
hacer referencia al código propio cuando corresponda.

