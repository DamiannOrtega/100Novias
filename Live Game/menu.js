
class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        // Cargar recursos para el menú (fondo, botones, etc.)
        this.load.image('menuBackground', 'assets/fondo.jpg');
        this.load.image('playButton', 'assets/play.png');
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

        // Configurar el evento de clic en el botón "Jugar"
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Cambiar a la escena del juego
        });
    }
}