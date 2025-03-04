class NameInputScene extends Phaser.Scene {
    constructor() {
        super({ key: "NameInputScene" });
    }

    create() {
        console.log("Creando escena NameInputScene...");

        // Fondo de la escena
        this.add.image(750, 400, 'assets/fondo.jpg').setDisplaySize(1500, 800);

        // Texto de instrucción
        this.add.text(400, 300, 'Ingresa tu nombre:', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        // Crear un campo de entrada de texto (HTML nativo)
        const input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = '400px';
        input.style.top = '400px';
        input.style.width = '300px';
        input.style.padding = '10px';
        input.style.fontSize = '24px';
        document.body.appendChild(input);

        // Crear un botón (HTML nativo)
        const button = document.createElement('button');
        button.innerText = 'Continuar';
        button.style.position = 'absolute';
        button.style.left = '400px';
        button.style.top = '500px';
        button.style.padding = '10px 20px';
        button.style.fontSize = '24px';
        document.body.appendChild(button);

        // Evento de clic en el botón
        button.addEventListener('click', () => {
            const name = input.value.trim();
            if (name) {
                // Guardar el nombre en localStorage
                localStorage.setItem('playerName', name);

                // Crear una instancia de Jugador y guardarla
                const jugador = new Jugador(name);
                jugador.guardar();

                // Eliminar los elementos HTML
                document.body.removeChild(input);
                document.body.removeChild(button);

                // Iniciar la escena del menú principal
                this.scene.start('MainMenu');
            } else {
                alert('Por favor, ingresa un nombre válido.');
            }
        });
    }
}