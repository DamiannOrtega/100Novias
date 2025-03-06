class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });

        // Propiedades de la clase (antes variables globales)
        this.player = null;          // Jugador
        this.peluches = null;        // Grupo de estrellas para recolectar
        this.bombs = null;           // Grupo de bombas
        this.platforms = null;       // Plataformas del juego
        this.cursors = null;         // Teclas del cursor (flechas)
        this.score = 0;              // Puntuación del jugador
        this.gameOver = false;       // Estado del juego (si ha terminado)
        this.scoreText = null;       // Texto que muestra la puntuación

        this.personaje = 1;          // Selección de personaje

        // Música y sonidos
        this.musicafondo = null;     // Música de fondo
        this.SonidosQuietas = [];    // Sonidos de idle
        this.pelucheSonido = null;   // Sonido al recolectar peluches
        this.SonidoMuerte = null;    // Sonido al morir
        this.cancionrandom = 0;      // Tiempo para reproducir sonidos de idle
        this.delaycancion = Phaser.Math.Between(5000, 10000); // Delay entre sonidos de idle

        // Instancia de la clase Jugador
        this.jugador = null;
        //Enemigos
        this.enemigo = null;
        this.enemigoVelocidad = 3;
        this.enemigoDireccion = 1;
        this.sonidoaAHahari = null;
        //Objeto especial
        this.rentaro = null;

    }

    init() {

        // Obtener el nombre del jugador desde localStorage
        const playerName = localStorage.getItem('playerName');

        // Cargar el jugador desde localStorage
        this.jugador = Jugador.cargar(playerName);

        if (!this.jugador) {
            // Si no existe el jugador en localStorage, crear uno nuevo
            this.jugador = new Jugador(playerName);
        }
    }

    // Carga los recursos del juego
    preload() {
        // Ambiente
        this.load.image('sky', 'assets/fondo.jpg');       // Fondo del juego
        this.load.image('groundsmall', 'assets/plataforma.png'); // Plataforma
        this.load.image('ground', 'assets/plataforma2.png'); // Plataforma
        this.load.image('peluche', 'assets/Flush.png');     // Estrella
        this.load.image('vacio', 'assets/vacio.png');
        // this.load.image('bomb', 'assets/bomb.png');    // Bomba

        // SHIZUKA
        this.load.image('Shizuka_parada', 'assets/Shizuka/s1.png');
        this.load.image('Shizuka_parada2', 'assets/Shizuka/s3.png');
        this.load.image('Shizuka_izquierda', 'assets/Shizuka/s2.png');
        this.load.image('Shizuka_izquierda2', 'assets/Shizuka/Shizuka.png');
        this.load.image('Shizuka_derecha', 'assets/Shizuka/s4.png');
        this.load.image('Shizuka_derecha2', 'assets/Shizuka/s5.png');
        this.load.image('Shizuka_muerte', 'assets/Shizuka/Smuerte.png');
        this.load.image('Shizuka_quieta', 'assets/Shizuka/ShizukaQuieta.png');

        // NANO
        this.load.image('Nano_parada', 'assets/Nano/NanoParada.png');
        this.load.image('Nano_izquierda', 'assets/Nano/NanoIzq.png');
        this.load.image('Nano_izquierda_parada', 'assets/Nano/nanoIzqParada.png');
        this.load.image('Nano_derecha_parada', 'assets/Nano/nanoDerParada.png');
        this.load.image('Nano_derecha', 'assets/Nano/NanoDer.png');
        this.load.image('Nano_brinca', 'assets/Nano/NanoDerParada.png');
        this.load.image('Nano_muerte', 'assets/Nano/NanoMuerte.png');
        this.load.image('Nano_quieta', 'assets/Nano/NanoQuieta1.png');
        this.load.image('Nano_quieta1', 'assets/Nano/NanoQuieta.png');

        // MÚSICA Y SONIDOS
        this.load.audio('musica_fondo', 'assets/Nivel1.mp3');
        // SHIZUKA
        this.load.audio('Shizuka_coin', 'assets/Shizuka/ShizukaFlush.mp3');
        this.load.audio('Shizuka_muerteS', 'assets/Shizuka/MuerteShizuka.mp3');
        this.load.audio('Shizuka_paradaS', 'assets/Shizuka/DialogoShizuka.mp3');
        this.load.audio('Shizuka_paradaS2', 'assets/Shizuka/Dialogo2Shizuka.mp3');
        this.load.audio('Shizuka_paradaS3', 'assets/Shizuka/DialogoShizuka3.mp3');
        this.load.audio('Shizuka_paradaS4', 'assets/Shizuka/DialogoShizuka4.mp3');
        this.load.audio('Shizuka_paradaS5', 'assets/Shizuka/DialogoShizuka5.mp3');

        // NANO
        this.load.audio('Nano_coin', 'assets/Nano/RegojerPeluche.mp3');
        this.load.audio('Nano_muerteS', 'assets/Nano/muertenano.mp3');
        this.load.audio('Nano_paradaS', 'assets/Nano/NanoDialogo2.mp3');
        this.load.audio('Nano_paradaS2', 'assets/Nano/NanoDialogo3.mp3');
        this.load.audio('Nano_paradaS3', 'assets/Nano/DialogoNano.mp3');

        //Enemigos
        this.load.image('bomb', 'assets/Enemigos/atacke.png');
        this.load.image('HahariR', 'assets/Enemigos/HahariAtaqueD.png');
        this.load.image('HahariL', 'assets/Enemigos/HahariAtaqueI.png');
        this.load.audio('Aparece_enemigo', 'assets/Enemigos/HahariAparece.mp3');
        //objeto especial
        this.load.image('Rentaro', 'assets/objetos/RentaroCaballo.png');

    }

    create() {

        // Recuperar el personaje seleccionado desde localStorage
        const personajeSeleccionado = localStorage.setItem('selectedCharacter', this.personaje);
        if (personajeSeleccionado) {
            this.personaje = parseInt(personajeSeleccionado);  // Asegurarse de que es un número
        }
        console.log("Personaje recuperado: ", this.personaje); // Verificar en la consola

        // Selección de personaje
        if (this.personaje === 1) {
            this.player = this.physics.add.sprite(100, 650, 'Nano_parada').setScale(0.2);
            console.log("Personaje seleccionado: Nano");
        } else if (this.personaje === 2) {
            this.player = this.physics.add.sprite(100, 650, 'Shizuka_parada').setScale(0.2);
            console.log("Personaje seleccionado: Shizuka");
        } else {
            console.log("No se ha seleccionado un personaje válido");
        }

        this.musicafondo = this.sound.add('musica_fondo', { loop: true, volume: 0.5 });
        this.musicafondo.play();
        this.idleTimer = 0;
        this.lastUpdateTime = 0;
        this.sonidoaAHahari = this.sound.add('Aparece_enemigo');
        // Añade el fondo del juego
        let sky = this.add.image(750, 400, 'sky');
        sky.setDisplaySize(1500, 800); // Ajusta al tamaño de la pantalla

        // Crea un grupo de plataformas estáticas (no se mueven)
        this.platforms = this.physics.add.staticGroup();

        // Crea el suelo del juego y lo escala para que cubra el ancho de la pantalla
        for (let x = 0; x <= 1500; x += 30) {
            this.platforms.create(x, 715, 'groundsmall').setScale(0.8).refreshBody();
        }

        // Mostrar el nombre del jugador
        this.playerNameText = this.add.text(16, 50, 'Jugador: ' + this.jugador.nombre, { fontSize: '32px', fill: '#000' });

        //Enemigos
        this.platforms.create(600, 400, 'groundsmall').setScale(0.8).refreshBody();
        this.platforms.create(1000, 300, 'groundsmall').setScale(0.8).refreshBody();
        this.platforms.create(1050, 300, 'groundsmall').setScale(0.8).refreshBody();
        this.platforms.create(1200, 300, 'groundsmall').setScale(0.8).refreshBody();
        this.platforms.create(1300, 170, 'ground').setScale(0.8).refreshBody();
        this.platforms.create(1150, 530, 'vacio').setScale(0.4).refreshBody();;
        this.platforms.create(1200, 530, 'vacio').setScale(0.4).refreshBody();;

        this.platforms.create(100, 370, 'ground').setScale(0.8).refreshBody();
        this.platforms.create(400, 570, 'ground').setScale(0.8).refreshBody();
        this.platforms.create(340, 250, 'ground').setScale(0.9).refreshBody();

        this.platforms.create(750, 280, 'ground');

        // Crea al jugador en una posición inicial
        if (this.personaje == 1) {
            this.player = this.physics.add.sprite(100, 650, 'Nano_parada').setScale(0.2);
        } else if (this.personaje == 2) {
            this.player = this.physics.add.sprite(100, 650, 'Shizuka_parada').setScale(0.2);
        }

        // Configura propiedades físicas del jugador (rebote y límites del mundo)
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Crea animaciones para el jugador (izquierda, derecha y quieto)
        if (this.personaje == 1) {
            this.anims.create({
                key: 'walk_left',
                frames: [
                    { key: 'Nano_izquierda' },
                    { key: 'Nano_izquierda_parada' }
                ],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'walk_right',
                frames: [
                    { key: 'Nano_derecha' },
                    { key: 'Nano_derecha_parada' }
                ],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'die',
                frames: [
                    { key: 'Nano_muerte' }
                ],
                frameRate: 10,
                repeat: 0 // No repetir la animación
            });


            this.anims.create({
                key: 'quieto',
                frames: [
                    { key: 'Nano_quieta1', duration: 3000 }, // Se mantiene 3 segundos
                    { key: 'Nano_quieta' } // Luego cambia y se queda aquí
                ],
                frameRate: 1, // Se ejecuta lentamente
                repeat: -1    // Se mantiene en el último frame
            });


        } else if (this.personaje == 2) {
            this.anims.create({
                key: 'walk_left',
                frames: [
                    { key: 'Shizuka_izquierda' },
                    { key: 'Shizuka_izquierda2' }
                ],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'walk_right',
                frames: [
                    { key: 'Shizuka_derecha' },
                    { key: 'Shizuka_derecha2' }
                ],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'die',
                frames: [
                    { key: 'Shizuka_muerte' }
                ],
                frameRate: 10,
                repeat: 0
            });

            this.anims.create({
                key: 'quieto',
                frames: [
                    { key: 'Shizuka_muerte', duration: 3000 }, // Se mantiene 3 segundos
                    { key: 'Shizuka_quieta' } // Luego cambia y se queda aquí
                ],
                frameRate: 1, // Se ejecuta lentamente
                repeat: -1    // Se mantiene en el último frame
            });


        }

        // Sonidos
        if (this.personaje == 1) {  // Nano
            this.SonidosQuietas = [
                this.sound.add('Nano_paradaS'),
                this.sound.add('Nano_paradaS2'),
                this.sound.add('Nano_paradaS3')
            ];
            this.pelucheSonido = this.sound.add('Nano_coin');
            this.SonidoMuerte = this.sound.add('Nano_muerteS');
        } else if (this.personaje == 2) {  // Shizuka
            this.SonidosQuietas = [
                this.sound.add('Shizuka_paradaS'),
                this.sound.add('Shizuka_paradaS2'),
                this.sound.add('Shizuka_paradaS3'),
                this.sound.add('Shizuka_paradaS4'),
                this.sound.add('Shizuka_paradaS5')
            ];
            this.pelucheSonido = this.sound.add('Shizuka_coin');
            this.SonidoMuerte = this.sound.add('Shizuka_muerteS');
        }

        // Configura las teclas del cursor para mover al jugador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Crea un grupo de estrellas para recolectar
        this.peluches = this.physics.add.group({
            key: 'peluche',
            repeat: 20, // 12 estrellas en total
            setXY: { x: 12, y: 0, stepX: 70 } // Espaciadas 70 píxeles en el eje X
        });

        // Configura un rebote aleatorio para cada estrella
        this.peluches.children.iterate((child) => {
            child.setScale(0.07);
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Crea un grupo de bombas
        this.bombs = this.physics.add.group();

        // Añade el texto de la puntuación en la esquina superior izquierda
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // Añade colisiones entre el jugador, las estrellas y las plataformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.peluches, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);


        // Detecta si el jugador recoge una estrella
        this.physics.add.overlap(this.player, this.peluches, this.collectStar, null, this);

        // Detecta si el jugador choca con una bomba
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.time.delayedCall(10000, this.createEnemy, [], this);

    }



    update(time) {
        if (this.gameOver) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('walk_left', true);
            this.idleTimer = 0; // Resetear el temporizador de inactividad
            this.lastUpdateTime = 0;
            this.SonidosQuietas.forEach((sonido) => sonido.stop());
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk_right', true);
            this.idleTimer = 0; // Resetear el temporizador de inactividad
            this.lastUpdateTime = 0;
            this.SonidosQuietas.forEach((sonido) => sonido.stop());
        } else {
            this.player.setVelocityX(0);
            this.idleTimer += time - (this.lastUpdateTime || time);
            this.lastUpdateTime = time;

            // Cambia a la animación "quieto" si han pasado 3 segundos o más de inactividad
            if (this.idleTimer >= 3000) {
                this.player.anims.play('quieto', true);
            } else {
                // Si el jugador está inactivo pero no durante 3 segundos, mostrar la imagen estática
                if (this.personaje == 1) {
                    this.player.setTexture('Nano_parada');
                } else if (this.personaje == 2) {
                    this.player.setTexture('Shizuka_parada');
                }
            }

            // Verificar si es momento de reproducir un sonido de idle
            if (time > this.cancionrandom + this.delaycancion) {
                let randomSound = Phaser.Math.RND.pick(this.SonidosQuietas);
                randomSound.play();

                // Espera 3 segundos después de que termine y luego elige otro
                this.delaycancion = Phaser.Math.Between(5000, 10000);
                this.cancionrandom = time + randomSound.duration * 1000 + 3000;
            }
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.idleTimer = 0;
            if (this.personaje == 1) {
                this.player.setTexture('Nano_brinca');
            } else if (this.personaje == 2) {
                this.player.setTexture('Shizuka_parada2');
            }
        }
        if (this.enemigo) {
            // Enemigo
            this.enemigo.x += this.enemigoVelocidad * this.enemigoDireccion;

            // Cambiar dirección si el enemigo alcanza el borde
            if (this.enemigo.x >= this.cameras.main.width - this.enemigo.width / 2 || this.enemigo.x <= this.enemigo.width / 2) {
                this.enemigoDireccion *= -1; // Cambiar dirección
                // Cambiar la imagen del enemigo (puedes usar diferentes imágenes si lo deseas)
                this.enemigo.setTexture(this.enemigoDireccion === 1 ? 'HahariR' : 'HahariL'); // Cambia a otra textura si tienes más
            }
        }

        //Objeto especial



    }

    collectStar(player, peluche) {
        peluche.disableBody(true, true);
        this.pelucheSonido.play();

        this.SonidosQuietas.forEach((sonido) => sonido.stop());

        // Aumentar los puntos del jugador
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Actualizar los puntos del jugador
        this.jugador.puntos = this.score;
        this.jugador.guardar();

        // Si no quedan estrellas activas, genera un nuevo lote de estrellas y una bomba
        if (this.peluches.countActive(true) === 0) {
            this.peluches.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });

            // Crea una bomba en una posición aleatoria
            // const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            // const bomb = this.bombs.create(x, 16, 'bomb');
            // bomb.setBounce(1);
            // bomb.setCollideWorldBounds(true);
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // bomb.allowGravity = false;
            this.time.addEvent({
                delay: 5000, // Lanzar cada 5 segundos
                callback: this.launchBomb,
                callbackScope: this,
                loop: true
            });
        }
    }

    createEnemy() {
        // Asegúrate de que el enemigo no se cree si ya existe
        if (this.enemigo) return;

        const x = Phaser.Math.Between(300, 1100);
        this.enemigo = this.add.sprite(x, 50, 'HahariR').setScale(0.2);
        this.sonidoaAHahari.play();
        // Configura la colisión del enemigo con el jugador
        this.physics.add.collider(this.player, this.enemigo, this.hitBomb, null, this);
        this.time.addEvent({
            delay: 2000, // Lanzar cada 2 segundos
            callback: this.launchBomb,
            callbackScope: this,
            loop: true
        });
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        this.musicafondo.stop();
        this.SonidoMuerte.play();
        player.setTint(0xff0000);

        if (this.personaje == 1) {
            player.setTexture('Nano_muerte');
        } else if (this.personaje == 2) {
            player.setTexture('Shizuka_muerte');
        }
        player.anims.play('die', true);
        this.gameOver = true;

        // Guardar los datos del jugador al finalizar el juego
        this.jugador.guardar();
    }


    launchBomb() {

        // MAXIMA CANTIDAD DE BOMBAS EN PANTALLA
        // Verificar si hay demasiadas bombas en pantalla
        if (this.bombs.getLength() >= 5) { // Máximo 5 bombas
            return; // No crear más bombas
        }
        if (!this.enemigo) return; // Asegúrate de que el enemigo exista

        const bomb = this.bombs.create(this.enemigo.x, this.enemigo.y, 'bomb');
        bomb.setBounce(1); // Permite que la bomba rebote
        bomb.setCollideWorldBounds(true); // Colisiona con los límites del mundo

        //bomb.allowGravity = true; // Permite que la bomba caiga

        bomb.setScale(0.05); // Cambia el tamaño de la bomba
        bomb.body.allowGravity = false;

        // Establecer la dirección de la bomba según la dirección del enemigo
        const direction = this.enemigoDireccion === 1 ? 250 : -250; // 200 es la velocidad horizontal de la bomba
        bomb.setVelocityX(direction); // Velocidad horizontal

        // Establecer una velocidad vertical baja para que baje lentamente
        bomb.setVelocityY(60); // Ajusta este valor para controlar la velocidad de descenso
        this.physics.add.collider(bomb, this.platforms, () => {
            // Invertir la velocidad vertical para que la bomba suba
            bomb.setVelocityY(-60); // Cambia este valor para controlar la velocidad de subida
        });

        // Eliminar la bomba después de 10 segundos
        this.time.delayedCall(10000, () => {
            if (bomb.active) {
                bomb.destroy();
            }
        });

        // Añadir un evento de actualización para controlar el movimiento de la bomba
        this.bombs.children.iterate((child) => {
            if (child.body) {
                // Si la bomba está por encima de un cierto límite, invertir la velocidad
                if (child.y < 100) { // Cambia 100 por la altura máxima que deseas
                    child.setVelocityY(60); // Cambia a velocidad de bajada
                } else if (child.y >= 700) { // Cambia 715 por la altura mínima (suelo)
                    child.setVelocityY(-60); // Cambia a velocidad de subida
                }
            }
        });
    }
}