 // Configuración básica del juego con Phaser
 const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

let music;

function preload() {
    // Cargar música
    this.load.audio('MusicaPrincipal', 'assets/Sounds/opening.mp3');
}

function create() {
    // Reproducir la música en bucle
    music = this.sound.add('MusicaPrincipal', { loop: true });
    music.play();

}