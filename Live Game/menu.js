class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('menuBackground', 'assets/fondo.jpg');
        this.load.image('playButton', 'assets/play.png');
    }

    create() {
        this.add.image(700, 300, 'menuBackground');

        // Botón de "Jugar"
        const playButton = this.add.image(700, 400, 'playButton').setInteractive();
        playButton.setScale(0.5);

        // Evento al presionar "Jugar"
        playButton.on('pointerdown', () => {
            this.scene.start('NameInputScene'); // Ir a la escena de entrada de nombre
        });
    }
}
