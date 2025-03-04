class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('menuBackground', 'assets/fondo.jpg');
        this.load.image('playButton', 'assets/play.png');
        // Cargar los sonidos
        this.load.audio('sonidoNano', 'assets/PresentacionNano.mp3');
        this.load.audio('sonidoShizuka', 'assets/ShizukaPresentación.mp3');
    }

    create() {
        this.add.image(700, 300, 'menuBackground');

        // Botón de "Jugar"
        const playButton = this.add.image(700, 400, 'playButton').setInteractive();
        playButton.setScale(0.5);

        // Cargar sonidos en la escena
        this.sonidoNano = this.sound.add('sonidoNano');
        this.sonidoShizuka = this.sound.add('sonidoShizuka');

        // Configurar el evento de clic en el botón "Jugar"
        playButton.on('pointerdown', () => {
            this.showNameInput(); // Cambiar a la escena del juego
        });
    }

    // Método que muestra la pantalla para ingresar el nombre
    showNameInput() {
        // Crear un contenedor de HTML dentro del juego (esto solo aparecerá cuando se haga clic en "Jugar")
        let container = document.createElement('div');
        container.id = 'nameInputContainer';  // Ya no es necesario aplicar estilos directamente aquí

        container.innerHTML = `
            <h2>Ingresa tu nombre:</h2>
            <input type="text" id="playerName" placeholder="Nombre del jugador" />
            <button id="submitNameButton">Aceptar</button>
        `;
        document.body.appendChild(container);

        // Event listener para el botón "Aceptar"
        let button = document.getElementById('submitNameButton');
        button.addEventListener('click', () => {
            let playerName = document.getElementById('playerName').value.trim();

            if (playerName) {
                // Crear un nuevo jugador y guardarlo
                let jugador = new Jugador(playerName);
                jugador.guardar();

                // Eliminar la pantalla de nombre
                document.body.removeChild(container);

                // Iniciar la escena del juego
                this.scene.start('GameScene');
            } else {
                alert('Por favor ingresa un nombre válido.');
            }
        });
    }

    selectCharacter(character, personaje) {
        selectedCharacter = character;
        document.getElementById('characterSelection').style.display = 'none';

        // Obtener la escena actual
        let scene = this.scene.get('GameScene');

        // Reanudar la física del juego si estaba pausada
        scene.physics.resume();

        // Reproducir el sonido correspondiente
        if (personaje === 'Nano' && this.sonidoNano) {
            this.sonidoNano.play();
        } else if (personaje === 'Shizuka' && this.sonidoShizuka) {
            this.sonidoShizuka.play();
        }
    }
}

function hoverCharacter(element, newSrc) {
    let img = element.querySelector("img");

    // Aplica la animación de desvanecimiento
    img.style.opacity = "0";

    // Espera 150ms antes de cambiar la imagen
    setTimeout(() => {
        img.src = newSrc;
        img.style.opacity = "1"; // Restablece la opacidad con la nueva imagen
    }, 150);
}

