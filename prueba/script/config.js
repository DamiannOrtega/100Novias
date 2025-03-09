
//Volumen
var savedVolume = localStorage.getItem("gameVolume");
if (savedVolume === null) {
    savedVolume = 1; // Volumen predeterminado
} else {
    savedVolume = parseFloat(savedVolume);
}

function selectCharacter(character) {
    let mainMenuScene = game.scene.keys.MainMenu; // Accede a la escena del menú

    if (mainMenuScene) {
        mainMenuScene.selectCharacter(character); // Llama a la función de selección dentro de Phaser
    }
}



// Configuración del juego con Phaser
var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    },
    plugins: {
        scene: [
            {
                key: 'DOMElementPlugin', // Clave del plugin
                plugin: Phaser.DOMElement, // Plugin de DOMElement
                mapping: 'dom' // Mapeo para usar `this.add.dom`
            }
        ]
    },
    scene: [MainMenu, GameScene] // Escenas del juego
};

var game = new Phaser.Game(config);
game.sound.volume = savedVolume;