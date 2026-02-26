# Preguntas - Frontend

## Componentes y estructura

1. ¿Cómo decidiste qué separar en componentes y qué dejar en una página? ¿Qué criterio usaste?
El Navbar se separó porque aparece en todas las vistas. Las páginas (TablesPage, ShiftsPage, etc.) se dejaron como componentes de página porque cada una tiene su propio estado y lógica de fetch. se armo asi ya que no hacia falta romper los componentes en componentes mas chicos porque no se reutilizan en ningun otro lado

2. ¿Tenés componentes que se reutilizan en más de una vista? ¿Cuáles y por qué?
Solamente se reutiliza NavBar. porque el resto de los componentes de pagina son unicos. Podria haberse reutilizado StatusBadge, ya que se usa en TablePage y ReservationPage.

## Estado y hooks

3. ¿Dónde guardás el estado de las listas (mesas, turnos, reservas)? ¿En cada página o en un nivel superior? ¿Por qué?
Se guarda en cada pagina por separado con useState local. No hay estado globa o superior. porque cada vista es independiente y no necesitan compartir datos con otras.

4. ¿Qué pasa si el usuario navega a otra página y vuelve? ¿Se vuelve a hacer el fetch? ¿Por qué elegiste ese comportamiento?
Se vuelve a hacer el fetch porque el useEffect corre al montar el componente y react desmonta/remonta los componentes al cambiar de ruta. Esto garantiza que los datos siempre esten actualizados. lo malo es que haces mas requests.
5. ¿Cómo manejás el estado de carga (loading) y de error al hacer requests a la API?
Cada pagina tiene su propio useState para cargar y error. Al iniciar el fetch se setea loading: true, al terminar se setea en false en el finally. Si este falla se guarada el mensaje en error y se devuelve antes de mostrar el contenido.
## Formularios

6. ¿Cómo manejás el estado del formulario de reserva? ¿Controlado o no controlado? ¿Por qué?
El formulario de reserva es controlado: cada campo tiene su valor en useState(form) y se actualiza en onChange. Se eligio controaldo porque necesitas acceder a los valores para validar antes del submit y limpiear errores field por field a medida que el usuario escriba.

7. ¿Qué validaciones hacés en el frontend antes de enviar el formulario? ¿Son las mismas que en el backend?
Se valida que el nombre no esté vacío, que partySize sea mayor a 0, que se haya seleccionado mesa y turno. Son validaciones básicas de "campo requerido". No replican validaciones del back como solapamiento de turnos o capacidad de mesa. El front valida que el forms este completo, y el back las reglas del negocio.

8. ¿Qué feedback le das al usuario cuando el submit falla (por ejemplo, mesa ocupada)? ¿Cómo mostrás el error que devuelve la API?
Si el submit falla, se captura el error con axios.isAxiosError y se lee err.response?.data?.message. Ese mensaje se guarda en apiError y se muestra en un <p className={styles.apiError}> arriba del formulario, con fondo rojo oscuro y borde rojo. Si el error no es de Axios, se muestra un mensaje genérico.

9. ¿Qué pasa si el usuario hace doble click en el botón de submit? ¿Lo prevenís de alguna forma?
El boton tiene disabled={submitting} y submitting se setea a true al inico del handleSubmit y vuelve a false en el finally. Mientras el requeset esta en vuelo, el boton queda deshabilitado y no se puede clickear de nuevo
## Comunicación con la API

10. ¿Cómo manejás los errores HTTP en el frontend? ¿Diferenciás entre un 400 y un 500?
Se usa axios.isAxiosError(err) para detectar errores de red o HTTP. El código actual no diferencia explícitamente entre 400 y 500

11. Después de crear o cancelar una reserva, ¿cómo actualizás la lista? ¿Volvés a hacer fetch o actualizás el estado local?
Al crear una reserva, se redirige con navigate('/reservations') — cuando la lista monta, hace fetch y trae los datos frescos. Al cancelar, no se hace refetch: se actualiza el estado local con setReservations(prev => prev.map(r => r.id === id ? updated : r)) usando la reserva actualizada que devuelve el backend. 

## React Router

12. ¿Cómo decidiste la estructura de rutas? ¿Por qué esas URLs?
Las rutas siguen convenciones REST-like para una SPA: /tables, /shifts, /reservations, /reservations/new, /reports. La ruta / redirige a /tables con <Navigate>. Se eligió /reservations/new en lugar de /new-reservation para mantener coherencia con la entidad que se está creando.

13. ¿Qué pasa si el usuario accede a una ruta que no existe? ¿Lo manejaste?
No está manejada explícitamente — no hay un <Route path="*"> con una página 404. Si el usuario entra a una URL que no existe, no ve nada