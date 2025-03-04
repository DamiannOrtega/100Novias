class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
    }

    // Guardar los datos del jugador en localStorage
    guardar() {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};

        // Si el jugador ya existe, actualizar los puntos en lugar de sobrescribir
        if (jugadores[this.nombre]) {
            jugadores[this.nombre].puntos = this.puntos;
        } else {
            jugadores[this.nombre] = { nombre: this.nombre, puntos: this.puntos };
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
            return jugador;
        }
        return null;
    }
}
