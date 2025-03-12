let selectedCharacter = null;

// Función para seleccionar personaje
function selectCharacter(personaje) {
    let volume = localStorage.getItem("gameVolume") || 1; // Recuperar el volumen guardado o usar 1 como valor por defecto

    if (personaje === 'Nano') {
        selectedCharacter = 1; // Asignar el valor a la variable global
        const nanoAudio = new Audio('assets/Nano/PresentacionNano.mp3');
        nanoAudio.volume = volume; // Aplicar el volumen
        nanoAudio.play();
    } else if (personaje === 'Shizuka') {
        selectedCharacter = 2; // Asignar el valor a la variable global
        const shizukaAudio = new Audio('assets/Shizuka/ShizukaPresentación.mp3');
        shizukaAudio.volume = volume; // Aplicar el volumen
        shizukaAudio.play();
    } else {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor selecciona un personaje antes de continuar.',
            position: 'bottom',
            toast: true,
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    console.log(`Personaje seleccionado: ${selectedCharacter}`);

    // Almacenar la selección en localStorage
    localStorage.setItem('selectedCharacter', selectedCharacter);

}

// Función para iniciar el juego y redirigir a otro HTML
function startGame() {
    window.location.href = "juego.html";
}

// Función para procesar el ingreso del nombre y mostrar el botón "Jugar"
document.getElementById('submitNameButton').addEventListener('click', function () {
    let playerName = document.getElementById('playerName').value.trim();

    // Validación de nombre vacío
    if (!playerName) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor ingresa un nombre válido.',
            position: 'bottom',
            toast: true,
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    // Validación de longitud mínima
    if (playerName.length < 4) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'El nombre debe tener al menos 4 caracteres.',
            position: 'bottom',
            toast: true,
            showConfirmButton: false,
            timer: 3000
        })
        return;
    }else{
        if(playerName.length > 8){
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'El nombre debe tener máximo 8 caracteres.',
                position: 'bottom',
                toast: true,
                showConfirmButton: false,
                timer: 3000
            })
            return;
        }
    }

     // Validación de caracteres permitidos: solo letras, números y guion bajo
     if (!/^[a-zA-Z0-9_]+$/.test(playerName)) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'El nombre solo puede contener letras, números y guion bajo (_).',
            position: 'bottom',
            toast: true,
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    // Si todo está bien, muestra el botón "Jugar"
    Swal.fire({
        icon: 'success',
        title: '¡Nombre válido!',
        text: 'Puedes continuar :D',
        position: 'bottom',
        toast: true,
        showConfirmButton: false,
        timer: 3000
    });

    // Almacenar el nombre en localStorage
    localStorage.setItem('playerName', playerName);

    // Eliminar la pantalla de ingreso de nombre
    document.getElementById('nameInputContainer').style.display = 'none';

    // Mostrar el botón "Jugar"
    document.getElementById('playButton').style.display = 'block';
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

// Al cargar la página, asegurarse de que el botón "Jugar" esté oculto
window.onload = function() {
    document.getElementById('playButton').style.display = 'none'; // Asegurarse de que el botón "Jugar" esté oculto al cargar
};