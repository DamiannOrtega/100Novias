
class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        // Cargar recursos para el menú (fondo, botones, etc.)
        this.load.image('menuBackground', 'assets/fondo.jpg');
        this.load.image('playButton', 'assets/play.png');
        // Cargar los sonidos
        this.load.audio('sonidoNano', 'assets/PresentacionNano.mp3');
        this.load.audio('sonidoShizuka', 'assets/ShizukaPresentación.mp3');
    }

    create() {
        // Cargar la información del jugador
        const jugador = Jugador.cargar();

        // Añadir el fondo del menú
        this.add.image(700, 300, 'menuBackground');

        // Mostrar los datos del jugador
        if (jugador) {
            this.add.text(400, 200, `Bienvenido, ${jugador.nombre}\nPuntos: ${jugador.puntos}`, {
                fontSize: '24px',
                fill: '#000'
            }).setOrigin(0.5);
        }

        // Crear el botón de "Jugar"
        const playButton = this.add.image(700, 400, 'playButton').setInteractive();
        playButton.setScale(0.5);

        // Cargar sonidos en la escena
        this.sonidoNano = this.sound.add('sonidoNano');
        this.sonidoShizuka = this.sound.add('sonidoShizuka');

        // Configurar el evento de clic en el botón "Jugar"
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Cambiar a la escena del juego
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
