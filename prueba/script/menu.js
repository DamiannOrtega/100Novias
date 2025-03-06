let selectedCharacter = null;

// Función para seleccionar personaje
function selectCharacter(personaje) {
    selectedCharacter = personaje;
    console.log(`Personaje seleccionado: ${selectedCharacter}`);

    // Reproducir sonido dependiendo del personaje
    if (personaje === 'Nano') {
        new Audio('assets/Nano/PresentacionNano.mp3').play();
    } else if (personaje === 'Shizuka') {
        new Audio('assets/Shizuka/ShizukaPresentación.mp3').play();
    }

    // Almacenar la selección en localStorage
    localStorage.setItem('selectedCharacter', personaje);

    // Mostrar la pantalla de ingreso de nombre
    document.getElementById('nameInputContainer').style.display = 'block';
}

// Función para iniciar el juego
// Función para iniciar el juego y redirigir a otro HTML
function startGame() {
    // Redirigir a la página de juego (puedes cambiar 'game.html' por el archivo adecuado)
    window.location.href = "juego.html";  // Esto redirige al archivo game.html
}

// Función para seleccionar personaje
function selectCharacter(personaje) {
    selectedCharacter = personaje;
    console.log(`Personaje seleccionado: ${selectedCharacter}`);

    // Reproducir sonido dependiendo del personaje
    if (personaje === 'Nano') {
        new Audio('assets/Nano/PresentacionNano.mp3').play();
    } else if (personaje === 'Shizuka') {
        new Audio('assets/Shizuka/ShizukaPresentación.mp3').play();
    }

    // Almacenar la selección en localStorage
    localStorage.setItem('selectedCharacter', personaje);

    // Mostrar la pantalla de ingreso de nombre
    document.getElementById('nameInputContainer').style.display = 'block';
}

// Función para procesar el ingreso del nombre y mostrar el botón "Jugar"
document.getElementById('submitNameButton').addEventListener('click', function () {
    let playerName = document.getElementById('playerName').value.trim();

    if (playerName) {
        // Almacenar el nombre en localStorage
        localStorage.setItem('playerName', playerName);

        // Eliminar la pantalla de ingreso de nombre
        document.getElementById('nameInputContainer').style.display = 'none';

        // Hacer visible el botón de "Jugar"
        document.getElementById('playButton').style.display = 'block';
    } else {
        alert('Por favor ingresa un nombre válido.');
    }
});

// Función para cambiar la imagen cuando el usuario pasa el ratón por encima
function hoverCharacter(element, newSrc) {
    let img = element.querySelector("img");
    img.style.opacity = "0"; // Desvanecer la imagen
    setTimeout(() => {
        img.src = newSrc; // Cambiar la imagen
        img.style.opacity = "1"; // Restaurar la opacidad
    }, 150);
}
