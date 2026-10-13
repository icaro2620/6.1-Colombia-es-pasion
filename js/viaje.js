// Estas variables pertenecen al archivo y las usamos en varios ejemplos.
const pais = 'Colombia';                 // Una cadena de texto.
let diasDeEjemplo = 3;                   // Un número que podemos cambiar.
const viajeEnGrupo = true;               // Un valor booleano.
const destinos = [
    { nombre: 'Cartagena', interes: 'mar', descripcion: 'Una idea para disfrutar del mar y pasear por la ciudad.', valorDiario: 180000 },
    { nombre: 'Bogotá', interes: 'ciudad', descripcion: 'Una idea para recorrer museos, calles y espacios culturales.', valorDiario: 150000 },
    { nombre: 'Eje Cafetero', interes: 'naturaleza', descripcion: 'Una idea para acercarse a paisajes verdes y a la cultura del café.', valorDiario: 130000 }
];
const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function mostrarDestinos() {
    const lista = document.querySelector('#tarjetasDestinos');
    // Recorremos el arreglo con for y creamos una tarjeta por destino.
    for (let indice = 0; indice < destinos.length; indice++) {
        const destino = destinos[indice];
        const columna = document.createElement('div');
        columna.className = 'col-md-4';
        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100';
        const numero = document.createElement('p');
        numero.className = 'numero';
        numero.textContent = '0' + (indice + 1);
        const titulo = document.createElement('h3');
        titulo.textContent = destino.nombre;
        const texto = document.createElement('p');
        texto.textContent = destino.descripcion;
        const boton = document.createElement('button');
        boton.className = 'btn btn-guardar mt-auto';
        boton.textContent = 'Guardar destino ♡';
        boton.setAttribute('aria-label', 'Guardar ' + destino.nombre);
        boton.addEventListener('click', function () { guardarDestino(destino, boton); });
        tarjeta.append(numero, titulo, texto, boton);
        columna.append(tarjeta);
        lista.append(columna);
    }
}

function elegirDestino(interes) {
    // if, else if y else eligen una opción según lo que busca la persona.
    if (interes === 'mar') {
        return destinos[0];
    } else if (interes === 'ciudad') {
        return destinos[1];
    } else {
        return destinos[2];
    }
}

function prepararViaje(interes, dias) {
    if (!Number.isInteger(dias) || dias < 1 || dias > 14) {
        throw new RangeError('Escribe un número entero entre 1 y 14.');
    }
    const destino = elegirDestino(interes);
    const plan = [];
    let dia = 1;
    // while repite la propuesta hasta completar la cantidad de días.
    while (dia <= dias) {
        plan.push('Día ' + dia + ': ' + (dia === 1 ? 'llegar y conocer el entorno' : 'explorar con calma y hacer una pausa'));
        dia++;
    }
    return { destino: destino.nombre, total: destino.valorDiario * dias, plan: plan };
}

function practicarConceptos() {
    const salida = [];
    salida.push('Texto: ' + pais + ' | tipo: ' + typeof pais);
    salida.push('Número: ' + diasDeEjemplo + ' | tipo: ' + typeof diasDeEjemplo);
    salida.push('Booleano: ' + viajeEnGrupo + ' | tipo: ' + typeof viajeEnGrupo);
    salida.push('Objeto: ' + JSON.stringify(destinos[0]));
    // Trabajamos con una copia para no alterar el catálogo de la página.
    const nombres = destinos.map(destino => destino.nombre);
    nombres.push('Santa Marta');
    const ultimo = nombres.pop();
    salida.push('Arreglo después de push y pop: ' + nombres.join(', '));
    salida.push('El elemento retirado fue: ' + ultimo);
    for (let i = 0; i < nombres.length; i++) salida.push('for: ' + nombres[i]);
    let pasos = 1;
    while (pasos <= 2) { salida.push('while: paso ' + pasos); pasos++; }
    let intento = 1;
    // do...while entra al menos una vez, aunque luego la condición sea falsa.
    do { salida.push('do...while: intento ' + intento); intento++; } while (intento <= 1);
    salida.push('Función y condicional: mar → ' + elegirDestino('mar').nombre);
    salida.push('Función y condicional: ciudad → ' + elegirDestino('ciudad').nombre);
    salida.push('Función y condicional: naturaleza → ' + elegirDestino('naturaleza').nombre);
    console.table(destinos);
    console.log(salida.join('\n'));
    return salida.join('\n');
}

function demostrarAlcance() {
    const saludoLocal = 'Hola desde una función';
    let mensaje = pais + ': ' + saludoLocal;
    if (true) {
        const detalleDelBloque = 'Esta variable solo existe dentro del bloque';
        console.log(detalleDelBloque);
    }
    // typeof permite comprobar una variable que no existe sin detener el programa.
    mensaje += '. Fuera del bloque, detalleDelBloque es ' + typeof detalleDelBloque + '.';
    console.log(mensaje);
    return mensaje;
}

function crearContador() {
    let visitas = 0;
    // Las funciones devueltas recuerdan visitas: esa es la clausura.
    // Cada contador tiene su propia variable y no la expone directamente.
    return {
        sumar: function () { visitas++; return visitas; },
        reiniciar: function () { visitas = 0; return visitas; },
        consultar: function () { return visitas; }
    };
}
const contador = crearContador();

mostrarDestinos();
console.log('Bienvenido al laboratorio de ' + pais + '.');
console.log('Prueba prepararViaje("mar", 3), demostrarAlcance() y crearContador() en la consola.');
document.querySelector('#formularioViaje').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const resultado = document.querySelector('#resultadoViaje');
    try {
        const interes = document.querySelector('#interes').value;
        const dias = Number(document.querySelector('#dias').value);
        const propuesta = prepararViaje(interes, dias);
        resultado.replaceChildren();
        const titulo = document.createElement('h3');
        titulo.textContent = propuesta.destino + ' · ' + dias + (dias === 1 ? ' día' : ' días');
        const costo = document.createElement('p');
        costo.textContent = 'Presupuesto ficticio de práctica: ' + pesos.format(propuesta.total);
        const lista = document.createElement('ul');
        propuesta.plan.forEach(function (texto) { const item = document.createElement('li'); item.textContent = texto; lista.append(item); });
        resultado.append(titulo, costo, lista);
        console.log('Propuesta:', propuesta);
    } catch (error) { resultado.textContent = error.message; }
});

// La lista se queda en memoria durante esta visita. No guardamos datos personales.
const favoritos = [];
function guardarDestino(destino, boton) {
    if (favoritos.includes(destino.nombre)) return;
    favoritos.push(destino.nombre);
    const cantidad = contador.sumar();
    boton.textContent = 'Guardado ♥';
    boton.disabled = true;
    document.querySelector('#resultadoVisitas').textContent = cantidad + (cantidad === 1 ? ' destino: ' : ' destinos: ') + favoritos.join(', ');
}
document.querySelector('#reiniciarVisitas').addEventListener('click', function () {
    favoritos.length = 0;
    contador.reiniciar();
    document.querySelector('#resultadoVisitas').textContent = 'Todavía no has guardado destinos.';
    document.querySelectorAll('.btn-guardar').forEach(function (boton) { boton.disabled = false; boton.textContent = 'Guardar destino ♡'; });
});

const consejos = ['Deja tiempo libre entre un plan y otro.', 'Pregunta antes de fotografiar a una persona.', 'Lleva una botella reutilizable y cuida los lugares que visitas.'];
// do...while muestra los consejos iniciales y se detiene al terminar el arreglo.
let indiceConsejo = 0;
do {
    const item = document.createElement('li');
    item.textContent = consejos[indiceConsejo];
    document.querySelector('#listaConsejos').append(item);
    indiceConsejo++;
} while (indiceConsejo < consejos.length);

// Esta clausura recuerda qué consejo mostrar en el siguiente clic.
function crearRuedaDeConsejos() {
    let siguiente = 0;
    const ideas = ['Escucha las historias de quienes viven allí.', 'Prueba algo nuevo en una cocina local.', 'Viaja ligero y deja espacio para lo inesperado.'];
    return function () {
        const consejo = ideas[siguiente];
        siguiente = (siguiente + 1) % ideas.length;
        return consejo;
    };
}
const siguienteConsejo = crearRuedaDeConsejos();
document.querySelector('#otroConsejo').addEventListener('click', function () {
    document.querySelector('#consejoExtra').textContent = siguienteConsejo();
});
