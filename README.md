Colombia es pasión - Viaja a Colombia
Laboratorio de JavaScript, Bootstrap y CSS

Esta página presenta una idea de viaje y ejercicios básicos de JavaScript.
No es una agencia de viajes. Los presupuestos y planes son ficticios.

index.html usa etiquetas semánticas y enlaza js/viaje.js con script y defer.
El archivo externo contiene variables de texto, número y booleano,
un arreglo de objetos y ejemplos de push, pop, map y forEach.
La función elegirDestino usa if, else if y else.
mostrarDestinos usa for; prepararViaje usa while; practicarConceptos
incluye do...while. Las funciones del viaje, favoritos y consejos se prueban en la página.
Los ejercicios adicionales se prueban en la consola.
demostrarAlcance explica el alcance del archivo, función y bloque.
crearContador devuelve funciones que comparten una variable privada:
este es el ejemplo de clausura. Cada contador es independiente.

Abre la carpeta en Visual Studio para editar HTML, CSS y JavaScript.
HTML y CSS no requieren compilación. Extrae el ZIP completo y abre index.html.
También puedes ejecutar desde esta carpeta:
python -m http.server 8874 --bind 127.0.0.1
Después visita http://127.0.0.1:8874/

En Chrome presiona F12 y selecciona Console. Prueba:
prepararViaje('mar', 3)
prepararViaje('ciudad', 1)
prepararViaje('naturaleza', 5)
prepararViaje('mar', 0) // debe mostrar un RangeError
practicarConceptos()
demostrarAlcance()
const prueba = crearContador();
prueba.sumar(); // 1
prueba.sumar(); // 2
prueba.reiniciar(); // 0
const otro = crearContador();
otro.consultar(); // 0: no comparte el estado con prueba

Las dependencias y la imagen están guardadas localmente.
GitHub: https://github.com/icaro2620/6.1-Colombia-es-pasion
Fuentes: consulta FUENTES.txt.

Pruebas realizadas en Chrome: generación de planes, favoritos, consejos,
fuente Nunito local y diseño móvil de 390 píxeles.

Diseño actualizado: fuente Nunito local, tarjetas redondeadas y sección
Antes de salir. Los favoritos y los consejos usan clausuras.
Los ejercicios adicionales se conservan en viaje.js y se prueban en consola.
