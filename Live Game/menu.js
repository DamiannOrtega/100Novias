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

        // Evento al presionar "Jugar"
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

