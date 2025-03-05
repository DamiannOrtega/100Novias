class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
        this.selectedCharacter = null;
    }

    preload() {
        this.load.image('menuBackground', 'assets/Background/menu.jpg');
        this.load.image('playButton', 'assets/play.png');

        // Cargar los sonidos
        this.load.audio('sonidoNano', 'assets/Nano/PresentacionNano.mp3');
        this.load.audio('sonidoShizuka', 'assets/Shizuka/ShizukaPresentación.mp3');
    }

    create() {
        this.add.image(650, 500, 'menuBackground');

        // Botón de "Jugar"
        this.playButton = this.add.image(700, 400, 'playButton').setInteractive();
        this.playButton.setScale(0.5);
        this.playButton.setVisible(false); // Inicialmente no visible

        // Cargar sonidos en la escena
        this.sonidoNano = this.sound.add('sonidoNano');
        this.sonidoShizuka = this.sound.add('sonidoShizuka');

        // Configurar el evento de clic en el botón "Jugar"
        this.playButton.on('pointerdown', () => {
            if (this.selectedCharacter) {
                this.scene.start('GameScene', { personaje: this.selectedCharacter });
            } else {
                console.log("Selecciona un personaje antes de jugar");
            }
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
                // Guardar el nombre en localStorage
                localStorage.setItem('playerName', playerName);

                // Crear un nuevo jugador y guardarlo
                let jugador = new Jugador(playerName);
                jugador.guardar();

                // Eliminar la pantalla de nombre
                document.body.removeChild(container);

                // Ahora mostramos el botón de "Jugar"
                this.playButton.setVisible(true); // Hacemos visible el botón de "Jugar"
            } else {
                alert('Por favor ingresa un nombre válido.');
            }
        });
    }

    // Método para seleccionar personaje y reproducir sonido
    selectCharacter(personaje) {
        this.selectedCharacter = personaje;

        // Reproducir sonido según el personaje
        if (personaje === 'Nano') {
            this.sonidoNano.play();
        } else if (personaje === 'Shizuka') {
            this.sonidoShizuka.play();
        }

        console.log(`Personaje seleccionado: ${this.selectedCharacter}`);

        // Mostrar la pantalla para ingresar el nombre
        this.showNameInput();
    }
}
