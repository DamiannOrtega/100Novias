document.addEventListener("DOMContentLoaded", () => {
    const volumenSlider = document.getElementById("volumen");

    // Cargar el volumen guardado
    let savedVolume = localStorage.getItem("gameVolume");
    if (savedVolume !== null) {
        volumenSlider.value = savedVolume;
    }

    // Actualizar el volumen en el juego
    volumenSlider.addEventListener("input", () => {
        let volumen = parseFloat(volumenSlider.value);
        localStorage.setItem("gameVolume", volumen);

        // Llamar a Phaser para actualizar el volumen
        if (window.game) {
            game.sound.volume = volumen; // Ajusta el volumen global del juego
        }
    });
});

