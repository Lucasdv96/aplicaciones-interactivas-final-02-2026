# Preguntas - Backend

## Arquitectura y capas

1. ¿Qué responsabilidad tiene cada capa (Controller, Service, Repository)? ¿Qué pasa si se pone lógica de negocio en el controller?
El Controller recibe el request HTTP, este extrae los datos y llama al Service. El service tiene las reglas (valida los solapamientos, verifica los estados de las mesas, etc) y llama al repository. El Repository solo interactua con la base de datos a travez del TypeORM. Si pones logica en el controller, se pierde reutilizacion y testeabilidad, ya que el mismo codigo no se podria llamar desde otro contexto (CLI, otro service o testeos)

2. Si necesitaras agregar una nueva entidad (por ejemplo, `Waiter`), ¿qué archivos crearías y en qué carpetas?
Crearia:
entities/Waiter.ts
repositories/WaiterRepository.ts
services/Waiter.services.ts
controllers/WaiterController.ts
Y registraria la entidad en data-source.ts

## Códigos HTTP y manejo de errores

3. ¿Qué código HTTP devolvés cuando se intenta crear una reserva para una mesa OUT_OF_SERVICE? ¿Por qué ese y no otro?
Devuelvo 400 BAD REQUEST. Ya que la solicitud es invalida porque el cliente esta pidiendo algo imposible con los datos que envio. Y se utilizaria este porque eses un problema de sintaxis y no del estado del servidor.

4. ¿Qué diferencia hay entre un 400 (Bad Request) y un 409 (Conflict)? ¿En qué casos usaste cada uno?
400 BAD REQUEST se usa cuando la request esta mal formada(Datos incorrectos o mal enviados) o viola una regla del negocio (ej: Mesa OUT OF SERVICE, partySize mayor capacidad, turno en el pasado). En cambio 409 CONFLICT, es cuando el request es valido pero choca con el estado actual del recurso, en nuestro caso se aplicaria cuando existe una reserva CONFIRMED para una mesa del mismo turno.

5. Si el cliente envía un JSON con campos faltantes, ¿qué código devolvés y qué mensaje?
Devolvemos 400 con un mensaje descriptivo dependiendo la situacion. Ejemplo: Service lanza { status: 400, message: '...'} mi errorHandler lo captura y lo devuelve al cliente

6. ¿Cómo manejás los errores inesperados (por ejemplo, la base de datos se cae)? ¿Devolvés el stack trace al cliente?
El errorHandler tiene dos ramas: si el error tiene status y message(Son los que tiramos desde service), los devuelve talcual. Si es un error inesperado (se cayo la DB) devuelve 500 Error genérico del servidor. No expone el stack trace al cliente

## Validaciones y reglas de negocio

7. ¿Dónde validás que la capacidad de una mesa sea mayor a 0? ¿En el controller, en el service, o en la entidad? ¿Por qué ahí?
Lo validamos en el Table.service, antes de crear la mesa. Porque de esta manera podemos devolver un mensaje claro al cliente antes de llegar a la base de datos

8. ¿Cómo implementaste la validación de solapamiento de turnos? Explicá la query o la lógica que usaste.
En Shift.services.ts se buscan todos los turnos del mismo día con findAllByDate(date) y se aplica la función timesOverlap() que implementa la lógica: startA < endB && startB < endA. Turnos adyacentes como 18:00-20:00 y 20:00-22:00 no se solapan porque la condición es estricta

9. ¿Qué pasa si dos requests intentan reservar la misma mesa y turno al mismo tiempo? ¿Cómo prevenís esa condición de carrera?
Con nuestra implementacion actual en caso que dos request llegue exactamente al mismo tiempo, ambos podrian pasar la validacion y crear una reserva duplicada. Lo que deberiamos hacer es una transaccion SELECT ... FOR UPDATE o un unique constraint en la DB sobre (tableId, shiftId) con status CONFIRMED. 

## TypeORM y base de datos

10. ¿Qué tipo de relaciones definiste entre las entidades (ManyToOne, OneToMany)? ¿Por qué elegiste esas?
Reservation tiene ManyToOne hacia table y ManyToOne hacia Shift. Porque muchas reservas pueden referenciar la misma mesa o el mismo turno. Desde Table y Shift se podria definir OneToMany hacia reservas, pero porque no es obligatorio ya que no necesitamos ir en esa direccion.

11. ¿Qué es `synchronize: true` en TypeORM y por qué no se recomienda en producción?
Hace que TypeORM altere automaticamente el schema de la DB al arrancar la app para que coincida con las entidades. No se recomienda su uso en produccion porque puede tirar las columnas o tablas con datos reales si cambias una entidad. Se usa 'synchronize: false' y migraciones explicitas porque podes revisarlas antes de ejecutarlas.
12. ¿Qué pasa si ejecutás `migration:run` dos veces seguidas?
No pasa nada porque TypeORM guarda en la tabla migrations que migraciones ya corrieron y saltea las que ya fueron ejectuadas. 
## Seed

13. ¿Cómo lograste que el seed sea idempotente?
Antes de insertar cada registro, se hace un findOne buscando por un campo único (número de mesa, fecha+hora del turno, etc.). Si ya existe, se saltea. Si no existe, se crea. Así podés correr npm run seed múltiples veces sin duplicar datos.
