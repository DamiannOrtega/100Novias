class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
    }

    // Guardar los datos del jugador en localStorage
    guardar() {
        // Obtener los datos de los jugadores almacenados en el localStorage.
        // Si no hay datos, se inicializa un objeto vacío.
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};

        // Verificar si el jugador ya existe en el objeto 'jugadores'.
        if (jugadores[this.nombre]) {
            // Si el jugador ya existe, actualizar sus puntos.
            jugadores[this.nombre].puntos = this.puntos;
        } else {
            // Si el jugador no existe, agregarlo al objeto 'jugadores' con su nombre y puntos.
            jugadores[this.nombre] = { nombre: this.nombre, puntos: this.puntos };
        }

        // Guardar el objeto 'jugadores' actualizado en el localStorage.
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
