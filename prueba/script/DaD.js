const piezas = document.querySelectorAll('.piece');
const zonas = document.querySelectorAll('.dropzone');
let colocadas = 0;
let tiempo = 30; // Tiempo inicial

// Función para mezclar las piezas aleatoriamente
function mezclarPiezas() {
    const piezasArray = Array.from(piezas);
    const piezasDesordenadas = piezasArray.sort(() => Math.random() - 0.5);
    const contenedorPiezas = document.querySelector('.pieces');
    piezasDesordenadas.forEach(pieza => {
        contenedorPiezas.appendChild(pieza); // Reorganizar las piezas
    });
}

// Llamar a la función para mezclar las piezas al cargar la página
mezclarPiezas();

piezas.forEach(pieza => {
    pieza.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('id', pieza.id);
    });
});

zonas.forEach(zona => {
    zona.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    zona.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('id');
        const pieza = document.getElementById(id);

        if (zona.children.length === 0 && id === zona.dataset.id) {
            zona.appendChild(pieza);
            pieza.style.cursor = 'default';
            pieza.draggable = false;
            colocadas++;
        }

// Al completar el rompecabezas
if (colocadas === 9) {
    document.getElementById('mensaje').textContent = '¡Rompecabezas completado!';
    clearInterval(contadorInterval); // Detener el contador

    // Calcular la bonificación de puntos según el tiempo restante
    let multiplicador = 1;
    if (tiempo > 20) {
        multiplicador = 10;
    } else if (tiempo > 10) {
        multiplicador = 5;
    } else if (tiempo >0){
        multiplicador = 2;
    }else{
        multiplicador=1;
    }

    // Obtener el nombre del jugador desde localStorage
    const nombreJugador = localStorage.getItem('playerName'); // Obtener el nombre del jugador

    // Obtener los jugadores del localStorage
    let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};

    // Si el jugador ya existe, actualizar su puntuación
    if (jugadores[nombreJugador]) {
        jugadores[nombreJugador].puntos *= multiplicador; // Multiplicar los puntos
    } else {
        // Si el jugador no existe, crear uno nuevo
        jugadores[nombreJugador] = {
            nombre: nombreJugador,
            puntos: score * multiplicador // Asignar puntos iniciales
        };
    }

    // Guardar el objeto actualizado en localStorage
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    setTimeout(() => {
        console.log("Redirigiendo a nivel2.html");
        window.location.href = "nivel2.html";
    }, 2000);

    // Mostrar la puntuación total en la interfaz
    // score *= multiplicador; // Actualizar la puntuación total
    document.getElementById('puntuacionTotal').textContent += ` Puntuación total: ${score}`;


}


    });
});

// Contador
const contadorElement = document.getElementById('contador');
const mensajeTiempo = document.getElementById('mensajeTiempo');
const contadorInterval = setInterval(() => {
    tiempo--;
    contadorElement.textContent = tiempo;

    // Mostrar mensajes según el tiempo restante
    if (tiempo === 29) {
        mensajeTiempo.textContent = 'Multiplicador: x10';
    } else if (tiempo === 20) {
        mensajeTiempo.textContent = 'Multiplicador: x5';
    } else if (tiempo === 10) {
        mensajeTiempo.textContent = 'Multiplicador: x2';
    } else if (tiempo === 0) {
        clearInterval(contadorInterval);
        document.getElementById('mensaje').textContent = '¡Tiempo agotado!';
        mensajeTiempo.style.display = 'none';
        contadorElement.style.display = 'none'; 
        window.location.href = "nivel2.html";
    }
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del jugador desde localStorage
    let playerName = localStorage.getItem("playerName");

    if (playerName) {
        let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};
        
        // Verificar si el jugador existe en el almacenamiento
        if (jugadores[playerName]) {
            let puntosJugador = jugadores[playerName].puntos;
            document.getElementById("puntos").textContent = puntosJugador; // Actualiza el HTML con la puntuación
        } else {
            document.getElementById("puntos").textContent = "0"; // Si no existe, muestra 0
        }
    } else {
        document.getElementById("puntos").textContent = "0"; // Si no hay playerName, muestra 0
    }
});
