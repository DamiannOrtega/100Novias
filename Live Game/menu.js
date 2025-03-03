// menu.js

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        // Cargar recursos para el menú (fondo, botones, etc.)
        this.load.image('menuBackground', 'assets/sky.png');
        this.load.image('playButton', 'assets/Flush.png');
    }

    create() {
        // Añadir el fondo del menú
        this.add.image(400, 300, 'menuBackground');

        // Crear el botón de "Jugar"
        const playButton = this.add.image(400, 400, 'playButton').setInteractive();
        playButton.setScale(0.5);

        // Configurar el evento de clic en el botón "Jugar"
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Cambiar a la escena del juego
        });
    }
}
