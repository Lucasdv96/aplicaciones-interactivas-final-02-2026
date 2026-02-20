# Preguntas - Frontend

## Componentes y estructura

1. ¿Cómo decidiste qué separar en componentes y qué dejar en una página? ¿Qué criterio usaste?
2. ¿Tenés componentes que se reutilizan en más de una vista? ¿Cuáles y por qué?

## Estado y hooks

3. ¿Dónde guardás el estado de las listas (mesas, turnos, reservas)? ¿En cada página o en un nivel superior? ¿Por qué?
4. ¿Qué pasa si el usuario navega a otra página y vuelve? ¿Se vuelve a hacer el fetch? ¿Por qué elegiste ese comportamiento?
5. ¿Cómo manejás el estado de carga (loading) y de error al hacer requests a la API?

## Formularios

6. ¿Cómo manejás el estado del formulario de reserva? ¿Controlado o no controlado? ¿Por qué?
7. ¿Qué validaciones hacés en el frontend antes de enviar el formulario? ¿Son las mismas que en el backend?
8. ¿Qué feedback le das al usuario cuando el submit falla (por ejemplo, mesa ocupada)? ¿Cómo mostrás el error que devuelve la API?
9. ¿Qué pasa si el usuario hace doble click en el botón de submit? ¿Lo prevenís de alguna forma?

## Comunicación con la API

10. ¿Cómo manejás los errores HTTP en el frontend? ¿Diferenciás entre un 400 y un 500?
11. Después de crear o cancelar una reserva, ¿cómo actualizás la lista? ¿Volvés a hacer fetch o actualizás el estado local?

## React Router

12. ¿Cómo decidiste la estructura de rutas? ¿Por qué esas URLs?
13. ¿Qué pasa si el usuario accede a una ruta que no existe? ¿Lo manejaste?
