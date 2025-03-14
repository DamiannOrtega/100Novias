document.addEventListener("DOMContentLoaded", function () {
    // Obtener los datos almacenados en el localStorage bajo la clave "jugadores"
    // Si no hay datos, se inicializa con un objeto vacío
    let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};
    
    // Obtener el elemento de la tabla donde se mostrarán los jugadores
    let tabla = document.getElementById("tablaPuntos");
    
    // Convertir el objeto "jugadores" a un array (con Object.values) y ordenar por puntos de mayor a menor
    let jugadoresArray = Object.values(jugadores).sort((a, b) => b.puntos - a.puntos);

    // Recorrer el array de jugadores ordenados e insertar los datos en la tabla
    jugadoresArray.forEach((jugador, index) => {
        // Crear una nueva fila HTML con la información del jugador
        let fila = `
            <tr>
                <td>${index + 1}</td> 
                <td>${jugador.nombre}</td> 
                <td>${jugador.puntos}</td>  
                <td>${jugador.fecha}</td>   
            </tr>
        `;
        
        // Añadir la fila generada al contenido HTML de la tabla
        tabla.innerHTML += fila;
    });
});
