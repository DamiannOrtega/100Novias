class NameInputScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NameInputScene' });
    }

    preload() {
        this.load.image('background', 'assets/fondo.jpg');
    }

    create() {
        // Agregar fondo
        this.add.image(750, 400, 'background');

        // Texto de instrucciones
        this.add.text(750, 250, "Ingresa tu nombre:", {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Crear un contenedor HTML con el input y botón
        const formHTML = `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <input type="text" id="nameInput" placeholder="Tu nombre..." 
                style="width: 200px; padding: 10px; font-size: 18px; text-align: center;">
                <br>
                <button id="confirmButton" 
                style="margin-top: 10px; padding: 10px; font-size: 18px; background-color: #0f0;">Confirmar</button>
            </div>
        `;

        // Agregar el formulario HTML al juego
        const domElement = this.add.dom(750, 400).createFromHTML(formHTML);

        // Obtener los elementos creados
        const inputElement = document.getElementById('nameInput');
        const confirmButton = document.getElementById('confirmButton');

        // Evento al hacer clic en "Confirmar"
        confirmButton.addEventListener('click', () => {
            const playerName = inputElement.value.trim();
            if (playerName) {
                let jugador = Jugador.cargar();

                if (!jugador || jugador.nombre !== playerName) {
                    jugador = new Jugador(playerName);
                }

                // Guardar en localStorage
                jugador.guardar();

                // Ocultar input y botón
                domElement.destroy();

                // Pasar a la escena del juego
                this.scene.start('GameScene', { jugador: jugador });
            }
        });
    }
}
