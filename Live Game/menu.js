class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
        this.selectedCharacter = null;
    }

    preload() {
        this.load.image('menuBackground', 'assets/fondo.jpg');
        this.load.image('playButton', 'assets/play.png');

        // Cargar los sonidos
        this.load.audio('sonidoNano', 'assets/Nano/PresentacionNano.mp3');
        this.load.audio('sonidoShizuka', 'assets/Shizuka/ShizukaPresentación.mp3');
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
            if (this.selectedCharacter) {
                this.scene.start('GameScene', { personaje: this.selectedCharacter });
            } else {
                console.log("Selecciona un personaje antes de jugar");
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