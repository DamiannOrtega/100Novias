document.addEventListener("DOMContentLoaded", () => {
    const volumenSlider = document.getElementById("volumen");
    const volumenActual = document.getElementById("volumen-actual");

    // Cargar el volumen guardado
    let savedVolume = localStorage.getItem("gameVolume");
    if (savedVolume !== null) {
        volumenSlider.value = savedVolume;
        volumenActual.textContent = savedVolume; // Mostrar el volumen guardado
    }

    // Control de volumen
    volumenSlider.addEventListener("input", () => {
        const newVolume = volumenSlider.value;
        volumenActual.textContent = newVolume; // Mostrar el nuevo volumen
        localStorage.setItem("gameVolume", newVolume); // Guardar el volumen
    });
});