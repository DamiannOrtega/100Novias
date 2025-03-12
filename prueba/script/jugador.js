class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.fecha = new Date().toLocaleDateString(); // Para la fecha
    }

    // Guardar los datos del jugador en localStorage
    guardar() {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};

        // Si el jugador ya existe, solo actualizar los puntos si los nuevos puntos son mayores
        if (jugadores[this.nombre]) {
            // Solo se actualizan si los nuevos puntos son mayores
            if (this.puntos > jugadores[this.nombre].puntos) {
                jugadores[this.nombre].puntos = this.puntos;
                jugadores[this.nombre].fecha = new Date().toLocaleDateString(); // Actualiza la fecha
            }
        } else {
            // Si no existe, lo agregamos
            jugadores[this.nombre] = { nombre: this.nombre, puntos: this.puntos, fecha: this.fecha };
        }

        localStorage.setItem('jugadores', JSON.stringify(jugadores));
    }

    // Cargar jugador desde localStorage
    static cargar(nombre) {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};
        if (jugadores[nombre]) {
            let datos = jugadores[nombre];
            let jugador = new Jugador(datos.nombre);
            jugador.puntos = datos.puntos;
            jugador.fecha = datos.fecha; 
            return jugador;
        }
        return null;
    }
}
