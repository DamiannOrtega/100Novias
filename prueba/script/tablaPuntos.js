document.addEventListener("DOMContentLoaded", function () {
    let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};
    let tabla = document.getElementById("tablaPuntos");
    
    // Convertir a array y ordenar por puntos (de mayor a menor)
    let jugadoresArray = Object.values(jugadores).sort((a, b) => b.puntos - a.puntos);

    // Insertar datos en la tabla
    jugadoresArray.forEach((jugador, index) => {
        let fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntos}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
});
