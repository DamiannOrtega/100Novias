let selectedCharacter = null;

// Función para seleccionar personaje
function selectCharacter(personaje) {
    let selectedCharacter;
    let volume = localStorage.getItem("gameVolume") || 1; // Recuperar el volumen guardado o usar 1 como valor por defecto

    if (personaje === 'Nano') {
        selectedCharacter = 1;
        const nanoAudio = new Audio('assets/Nano/PresentacionNano.mp3');
        nanoAudio.volume = volume; // Aplicar el volumen
        nanoAudio.play();
    } else if (personaje === 'Shizuka') {
        selectedCharacter = 2;
        const shizukaAudio = new Audio('assets/Shizuka/ShizukaPresentación.mp3');
        shizukaAudio.volume = volume; // Aplicar el volumen
        shizukaAudio.play();
    }

    console.log(`Personaje seleccionado: ${selectedCharacter}`);

    // Almacenar la selección en localStorage
    localStorage.setItem('selectedCharacter', selectedCharacter);

    // Mostrar la pantalla de ingreso de nombre
    document.getElementById('nameInputContainer').style.display = 'block';
}
// Función para iniciar el juego y redirigir a otro HTML
function startGame() {
    window.location.href = "juego.html";
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

// Eventos para mostrar y ocultar el placeholder del input de nombre
const input = document.getElementById("playerName");
input.addEventListener("focus", function () {
    this.placeholder = "";
});
input.addEventListener("blur", function () {
    this.placeholder = "Nombre del jugador";
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
