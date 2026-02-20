# Preguntas - Backend

## Arquitectura y capas

1. ¿Qué responsabilidad tiene cada capa (Controller, Service, Repository)? ¿Qué pasa si se pone lógica de negocio en el controller?
2. Si necesitaras agregar una nueva entidad (por ejemplo, `Waiter`), ¿qué archivos crearías y en qué carpetas?

## Códigos HTTP y manejo de errores

3. ¿Qué código HTTP devolvés cuando se intenta crear una reserva para una mesa OUT_OF_SERVICE? ¿Por qué ese y no otro?
4. ¿Qué diferencia hay entre un 400 (Bad Request) y un 409 (Conflict)? ¿En qué casos usaste cada uno?
5. Si el cliente envía un JSON con campos faltantes, ¿qué código devolvés y qué mensaje?
6. ¿Cómo manejás los errores inesperados (por ejemplo, la base de datos se cae)? ¿Devolvés el stack trace al cliente?

## Validaciones y reglas de negocio

7. ¿Dónde validás que la capacidad de una mesa sea mayor a 0? ¿En el controller, en el service, o en la entidad? ¿Por qué ahí?
8. ¿Cómo implementaste la validación de solapamiento de turnos? Explicá la query o la lógica que usaste.
9. ¿Qué pasa si dos requests intentan reservar la misma mesa y turno al mismo tiempo? ¿Cómo prevenís esa condición de carrera?

## TypeORM y base de datos

10. ¿Qué tipo de relaciones definiste entre las entidades (ManyToOne, OneToMany)? ¿Por qué elegiste esas?
11. ¿Qué es `synchronize: true` en TypeORM y por qué no se recomienda en producción?
12. ¿Qué pasa si ejecutás `migration:run` dos veces seguidas?

## Seed

13. ¿Cómo lograste que el seed sea idempotente?

