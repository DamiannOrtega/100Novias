const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.82;
canvas.height = window.innerHeight * 0.85;

// Cargar video
const video = document.createElement("video");
video.src = "assets/background/WIN.mp4";
video.autoplay = true;
video.loop = true;
video.play();

// Obtener datos del jugador
let playerName = localStorage.getItem("playerName") || "Jugador";
let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};
let playerPoints = jugadores[playerName] ? jugadores[playerName].puntos : 0;

// Cargar imagen
const image = new Image();
image.src = "assets/background/titulo.png";

// Variables para animación de deslizamiento
let nameX = -500; // Empieza fuera del canvas, a la izquierda
let pointsX = canvas.width + 500; // Empieza fuera del canvas, a la derecha
let alpha = 0; // Opacidad inicial

// Función para animar el texto (deslizamiento y aparición)
function drawText() {
    if (nameX < 450) nameX += 30; // Mueve el nombre hacia la posición central
    if (pointsX > 425) pointsX -= 30; // Mueve la puntuación hacia la posición central

    if (alpha < 1) alpha += 0.02; // Aumenta la opacidad gradualmente
    ctx.globalAlpha = alpha; // Aplica la opacidad

    ctx.font = "50px Aclonica";
    ctx.shadowColor = "#FF00FF"; 
    ctx.fillStyle = "#FF1493"; 
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "#000000"; 
    ctx.lineWidth = 10;

    // Dibujar el nombre y la puntuación con su animación
    ctx.strokeText(playerName, nameX, 300);
    ctx.fillText(` ${playerName}`, nameX - 20, 300); // Nombre

    ctx.strokeText(`Puntos: ${playerPoints}`, pointsX, 400);
    ctx.fillText(`Puntos: ${playerPoints}`, pointsX + 8, 400); // Puntuación

    ctx.globalAlpha = 1; // Restablecer opacidad para otros elementos
}

// Dibujar video en el canvas con animación
function drawVideo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    drawText();
    ctx.drawImage(image, 530, 0, 170, 170);

    requestAnimationFrame(drawVideo);
}

// Iniciar animación cuando el video esté cargado
video.addEventListener("loadeddata", () => {
    drawVideo();
});

// Mostrar el botón de menú cuando cargue la página
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    menuButton.style.display = "block";
});

// Redirigir al menú principal
document.getElementById('menuButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});
