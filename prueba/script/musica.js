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

    // Cargar el volumen guardado
    let savedVolume = localStorage.getItem("gameVolume");
    if (savedVolume !== null) {
        setVolume(savedVolume); // Aplicar el volumen guardado
        document.getElementById("volumen").value = savedVolume; // Ajustar el slider
        document.getElementById("volumen-actual").textContent = savedVolume; // Mostrar el volumen actual
    }

    // Control de volumen
    const volumenSlider = document.getElementById("volumen");
    volumenSlider.addEventListener("input", () => {
        const newVolume = volumenSlider.value;
        setVolume(newVolume); // Aplicar el nuevo volumen
        localStorage.setItem("gameVolume", newVolume); // Guardar el volumen
        document.getElementById("volumen-actual").textContent = newVolume; // Mostrar el nuevo volumen
    });
}

function setVolume(volume) {
    // Aplicar el volumen a la música
    music.setVolume(volume);
}