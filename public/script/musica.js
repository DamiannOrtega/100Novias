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
let musicFile = obtenerCancion(); // Obtemos la canción según el HTML

function preload() {
    // Carga la música seleccionada dinámicamente
    this.load.audio('MusicaDinamica', musicFile);
}

function create() {
    // Reproduce la música en bucle
    music = this.sound.add('MusicaDinamica', { loop: true });
    music.play();

    // Carga el volumen guardado
    let savedVolume = localStorage.getItem("gameVolume");
    if (savedVolume !== null) {
        setVolume(savedVolume);
        document.getElementById("volumen").value = savedVolume;
        document.getElementById("volumen-actual").textContent = savedVolume;
    }

    // Control de volumen
    const volumenSlider = document.getElementById("volumen");
    volumenSlider.addEventListener("input", () => {
        const newVolume = volumenSlider.value;
        setVolume(newVolume);
        localStorage.setItem("gameVolume", newVolume);
        document.getElementById("volumen-actual").textContent = newVolume;
    });
}

function setVolume(volume) {
    music.setVolume(volume);
}

// Función para obtener la canción según el HTML de origen
function obtenerCancion() {
    const ruta = window.location.pathname; // Obtiene la ruta del archivo HTML

    if (ruta.includes("index.html")) {
        return "assets/Sounds/opening.mp3";
    } 
     if (ruta.includes("rompecabezas.html")) {
        return "assets/Sounds/Rompecabezas.mp3";
    } 


    return "assets/Sounds/menus.mp3";
}
