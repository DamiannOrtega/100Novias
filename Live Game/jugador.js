class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
    }

    // Guardar los datos en localStorage
    guardar() {
        const datos = {
            nombre: this.nombre,
            puntos: this.puntos
        };
        localStorage.setItem('jugador', JSON.stringify(datos));
    }

    // Cargar los datos desde localStorage
    static cargar() {
        const datos = JSON.parse(localStorage.getItem('jugador'));
        if (datos) {
            const jugador = new Jugador(datos.nombre);
            jugador.puntos = datos.puntos;
            return jugador;
        }
        return null;
    }
}