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
        this.icono = null;
        this.personaje = 1;          // Selección de personaje
        this.isPaused = false; // Estado de pausa


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
        this.lives = 3;  // Inicialmente, el jugador tiene 3 vidas
        this.ImagenVida = [];
        this.numrand= null;
        this.hahaiEnojada=null;


        //Objeto especial
        this.rentaro = null;
        this.rentaroTimer = null; // Temporizador para el parpadeo
        this.rentaroBlinking = false; // Estado de parpadeo
        this.rentaroTimerText = null; // Texto del contador de tiempo
        this.rentaroTimeLeft = 0; // Tiempo inicial para la bonificación (en segundos)
        this.numrand=null;

        //Objeto especial
        this.rentaro2 = null;
        this.rentaroTimer2 = null; // Temporizador para el parpadeo
        this.numrand2=null;
        this.rentarovalue=null;
        this.rentarovalue2=null;
        this.rentaroBlinking2 = false; // Estado de parpadeo
        this.rentaroTimeLeft2 = 0; // Tiempo inicial para la bonificación (en segundos)
        this.rentaroTimerText2 = null; // Texto del contador de tiempo

        
    }

    init() {

        // Obtener el nombre del jugador desde localStorage
        const playerName = localStorage.getItem('playerName');

        // Cargar el jugador desde localStorage
        this.jugador = Jugador.cargar(playerName);
        this.generarAleatorio();
        this.generarAleatorio2();
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
        this.load.image('Icono_Shizuka', 'assets/Shizuka/iconoShizuka.png');


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
        this.load.image('Icono_Nano', 'assets/Nano/iconoNano.png');


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
        this.load.image('vidas', 'assets/objetos/Corazones.png');
        this.load.image('RentaroR', 'assets/objetos/RentaroCaballo2.png');


    }

    create() {
        const pauseButton = document.getElementById('pauseButton');

        pauseButton.addEventListener('click', function () {
            this.togglePause();
        }.bind(this)); // Asegúrate de que 'this' se refiera al contexto de tu juego Phaser

        // Agregar evento de clic al botón de reanudar
        document.getElementById('resumeButton').addEventListener('click', () => {
            this.togglePause(); // Llama a la función de pausa para reanudar
        });
        // Recuperar el personaje seleccionado desde localStorage
        const personajeSeleccionado = localStorage.getItem('selectedCharacter');

        if (personajeSeleccionado) {
            this.personaje = parseInt(personajeSeleccionado);  // Asegurarse de que es un número
        }


        // Selección de personaje
        if (this.personaje === 1) {
            this.player = this.physics.add.sprite(100, 650, 'Nano_parada').setScale(0.2);

        } else if (this.personaje === 2) {
            this.player = this.physics.add.sprite(100, 650, 'Shizuka_parada').setScale(0.2);

        }

        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

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

        this.playerNameText = this.add.text(16, 100, 'Jugador: ' + this.jugador.nombre, { fontSize: '32px', fill: '#000' });


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



        this.rentaroTimerText = this.add.text(16, 160, 'Tiempo: 0', { fontSize: '32px', fill: '#000' });
        this.rentaroTimerText.setVisible(false);
        
        this.rentaroTimerText2 = this.add.text(16, 190, 'Tiempo: 0', { fontSize: '32px', fill: '#000' });
        this.rentaroTimerText2.setVisible(false);
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


        if (this.personaje == 1) {
            this.icono = this.add.image(160, 50, 'Icono_Nano').setScale(0.5);

        } else if (this.personaje == 2) {
            this.icono = this.add.image(160, 50, 'Icono_Shizuka').setScale(0.5);

        }
        for (let i = 0; i < this.lives; i++) {
            const vidaImage = this.add.image(160 + (i * 65), 55, 'vidas').setScale(0.2);
            this.ImagenVida.push(vidaImage);
        }


        // Crea un grupo de bombas
        this.bombs = this.physics.add.group();

        // Añade el texto de la puntuación en la esquina superior izquierda
        this.scoreText = this.add.text(16, 130, 'score: 0', { fontSize: '32px', fill: '#000' });

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
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.togglePause();
        }
        if (this.isPaused) {
            // Si el juego está en pausa, detener la animación y establecer la textura de "parado"
            if (this.personaje == 1) {
                this.player.setTexture('Nano_parada');
            } else if (this.personaje == 2) {
                this.player.setTexture('Shizuka_parada');
            }
            this.player.setVelocityX(0); // Asegúrate de que el jugador no se mueva

            return; // Si el juego está en pausa, no actualices nada
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

                // Verificar si la puntuación ha alcanzado los 400 puntos
                if (this.score >= 400 && !this.hahaiEnojada) {
                    this.lanzarBombasAdicionales(); // Llama a la función para lanzar bombas adicionales
                    this.hahaiEnojada = true; // Marca que ya se lanzaron las bombas adicionales
                }

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
        // Genera un número aleatorio múltiplo de 10 hasta 100
        // Usando ese número en tu condicional
        
        // Verificar si el puntaje coincide con el número aleatorio generado
        if (this.score === this.numrand) {
            this.createRentaro(); // Crear el objeto especial
        }
        if (this.score === this.numrand2) {
            this.createSecondRentaro(); // Crear el objeto especial
        }
        if (this.score >= 500) {
            this.completeLevel(); // Llamar a la función para completar el nivel
        }
        // Si no quedan estrellas activas, genera un nuevo lote de estrellas y una bomba
        if (this.peluches.countActive(true) === 0) {
            this.peluches.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });

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
        if (this.isInvincible) return;  // Si el jugador es inmune, no hace nada

        bomb.disableBody(true, true);  // Desaparece la bomba
        this.lives--;  // Restar una vida
        // Actualizar las imágenes de las vidas
        if (this.ImagenVida.length > 0) {
            const vidaImage = this.ImagenVida.pop(); // Eliminar la última imagen de vida
            vidaImage.destroy(); // Destruir la imagen de vida
        }

        // Si aún tiene vidas, hacer que el jugador parpadee y sea inmune por 3 segundos
        if (this.lives > 0) {
            this.isInvincible = true; // Activar inmunidad
            this.player.setTint(0xff0000); // Efecto visual de daño

            // Parpadeo: Cambiar la opacidad del jugador
            this.tweens.add({
                targets: this.player,
                alpha: 0, // El jugador desaparecerá
                duration: 200, // 200ms de fade out
                yoyo: true,  // Volverá a la opacidad normal
                repeat: 5,  // El parpadeo se repite 5 veces
                onComplete: () => {
                    this.player.clearTint(); // Limpiar el tinte del jugador al terminar
                }
            });

            // Después de 3 segundos, desactivar la inmunidad
            this.time.delayedCall(3000, () => {
                this.isInvincible = false;
                this.player.clearTint(); // Eliminar el tinte del jugador
            });

        } else {
            // Si las vidas llegan a 0, terminar el juego
            this.player.setTint(0xff0000);
            this.player.anims.play('die'); // Animación de muerte
            this.physics.pause();
            this.musicafondo.stop();
            this.SonidoMuerte.play();
            this.gameOver = true;
            this.scoreText.setText('¡GAME OVER!');
        }
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
    
    lanzarBombasAdicionales() {
        // Lanza 10 bombas adicionales
        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 1000, () => {
                // Lanza una bomba adicional sin la limitación de 5
                const bomb = this.bombs.create(this.enemigo.x, this.enemigo.y, 'bomb');
                bomb.setBounce(1); // Permite que la bomba rebote
                bomb.setCollideWorldBounds(true); // Colisiona con los límites del mundo
    
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
            }, [], this);
        }
    }
    togglePause() {
        this.isPaused = !this.isPaused; // Cambiar el estado de pausa
        const canvas = document.querySelector('canvas');
        const pauseButton = document.getElementById('pauseButton');
        const resumeButton = document.getElementById('resumeButton');
        if (this.isPaused) {
            this.physics.pause(); // Pausar la física
            this.musicafondo.pause(); // Pausar la música de fondo
            canvas.classList.add('blur'); // Agregar la clase de desenfoque al canvas
            pauseButton.style.display = 'none'; // Ocultar el botón de pausa
            resumeButton.style.display = 'flex'; // Mostrar el botón de reanudar
            this.SonidosQuietas.forEach((sonido) => {
                if (sonido.isPlaying) {
                    sonido.pause();
                }
            });

            // Pausar el sonido del enemigo si está reproduciéndose
            if (this.sonidoaAHahari.isPlaying) {
                this.sonidoaAHahari.pause();
            }

            // Aquí puedes pausar otros sonidos si es necesario
        } else {
            this.physics.resume(); // Reanudar la física
            this.musicafondo.resume(); // Reanudar la música de fondo
            canvas.classList.remove('blur'); // Agregar la clase de desenfoque al canvas
            pauseButton.style.display = 'flex'; // Mostrar el botón de pausa
            resumeButton.style.display = 'none'; // Ocultar el botón de reanudar
            this.SonidosQuietas.forEach((sonido) => {
                if (sonido.isPaused) {
                    sonido.resume();
                }
            });

            // Reanudar el sonido del enemigo si estaba pausado
            if (this.sonidoaAHahari.isPaused) {
                this.sonidoaAHahari.resume();
            }

            // Aquí puedes reanudar otros sonidos si es necesario
        }
    }

    createRentaro() {
        this.rentaroTimeLeft = 10; // Reinicia el tiempo
        const x = Phaser.Math.Between(100, 1400);
        this.rentaroValue = 50;
        const y = 0; // Aparece en la parte superior de la pantalla
        this.rentaro = this.physics.add.sprite(x, y, 'RentaroR').setScale(0.1);
        this.rentaro.setCollideWorldBounds(true);
        this.rentaro.setBounce(1); // Permitir que rebote
        this.rentaro.setGravityY(300); // Establecer gravedad para que caiga
        // Hacer que Rentaro parpadee
        this.rentaroBlinking = true;
        this.rentaroTimer = this.time.addEvent({
            delay: 100, // Cambiar cada 100 ms
            callback: this.blinkRentaro,
            callbackScope: this,
            loop: true
        });
        
        this.rentaroTimerText.setVisible(true);
        this.rentaroTimerText.setText('Tiempo: ' + this.rentaroTimeLeft); // Actualiza el texto

        this.rentaroTimerEvent = this.time.addEvent({
            delay: 1000, // 1 segundo
            callback: () => {
                this.rentaroTimeLeft--;
                this.rentaroTimerText.setText('Tiempo: ' + this.rentaroTimeLeft); // Actualiza el texto
    
                // Si el tiempo llega a 0, destruye Rentaro
                if (this.rentaroTimeLeft <= 0) {
                    this.rentaroTimerText.setVisible(false);
                    this.rentaroValue = 10;
                    this.rentaroTimerEvent.remove(); // Detener el temporizador
                }
            },
            callbackScope: this,
            loop: true // Repetir el evento
        });
        // Detectar si el jugador recoge a Rentaro
        this.physics.add.collider(this.rentaro, this.platforms);
        this.physics.add.overlap(this.player, this.rentaro, this.collectRentaro, null, this);

        // Desactivar el parpadeo después de 10 segundos
        this.time.delayedCall(10000, () => {
            this.rentaroBlinking = false;
            this.rentaro.setTint(0xffffff); // Restablecer color
            this.rentaroTimer.remove(); // Detener el parpadeo
        });

        // Iniciar el movimiento de Rentaro
        this.moveRentaro();
    }

moveRentaro() {
    if (!this.rentaro) return;

    // Movimiento horizontal de Rentaro
    const direction = Phaser.Math.Between(-1, 1); // Movimiento a la izquierda (-1) o a la derecha (1)
    const speedX = 200; // Velocidad de movimiento horizontal

    // Establecer velocidad horizontal
    this.rentaro.setVelocityX(direction * speedX); // Velocidad horizontal

    // Configurar colisión con los límites del mundo y rebote
    this.rentaro.setCollideWorldBounds(true);
    this.rentaro.setBounce(1); // Permitir rebote en los límites del mundo

    // Hacer que Rentaro parpadee mientras se mueve
    this.rentaroBlinking = true;
    this.rentaroTimer = this.time.addEvent({
        delay: 100, // Cambiar cada 100 ms
        callback: this.blinkRentaro,
        callbackScope: this,
        loop: true
    });

    // Desactivar el parpadeo después de 10 segundos
    this.time.delayedCall(10000, () => {
        this.rentaroBlinking = false;
        this.rentaro.setTint(0xffffff); // Restablecer color
        if (this.rentaroTimer) {
            this.rentaroTimer.remove(); // Detener el parpadeo
        }
    });

    // Añadir un evento de actualización para verificar la posición de Rentaro
    this.time.addEvent({
        delay: 100, // Comprobar cada 100 ms
        callback: () => {
            if (this.rentaro && this.rentaro.body) { // Verifica que rentaro esté definido
                // Cambiar la textura según la dirección de movimiento
                if (this.rentaro.body.velocity.x < 0) {
                    this.rentaro.setTexture('Rentaro'); // Cambiar a la imagen de Rentaro si se mueve a la izquierda
                } else if (this.rentaro.body.velocity.x > 0) {
                    this.rentaro.setTexture('RentaroR'); // Cambiar a la imagen de RentaroR si se mueve a la derecha
                }

                // Verificar límites de la pantalla
                if (this.rentaro.x >= 1420) {
                    this.rentaro.setVelocityX(-speedX); // Cambiar dirección
                } else if (this.rentaro.x <= 80) {
                    this.rentaro.setVelocityX(speedX); // Cambiar dirección
                }
            }
        },
        callbackScope: this,
        loop: true // Repetir el evento
    });
}

    blinkRentaro() {
        if (this.rentaroBlinking) {
            const randomColor = Phaser.Display.Color.RandomRGB();
            this.rentaro.setTint(randomColor.color);
        }
    }

    collectRentaro(player, rentaro) {
        rentaro.disableBody(true, true);
        this.score += this.rentaroValue; ; // Rentaro vale 50 puntos
        this.jugador.puntos = this.score;
        this.scoreText.setText('Score: ' + this.score);
        this.jugador.guardar();
        this.rentaro.destroy();

    // Detener el temporizador y ocultar el texto
    if (this.rentaroTimerEvent) {
        this.rentaroTimerEvent.remove(); // Detener el temporizador
    }
    this.rentaroTimerText.setVisible(false); // Ocultar el texto del temporizador
    }

    generarAleatorio() {
        // Generar un número aleatorio entre 1 y 10
        const randomNum = Math.floor(Math.random() * 10) + 1; // Esto genera un número entre 1 y 10
        this.numrand = randomNum * 10; // Multiplicar por 10 para obtener un múltiplo de 10 entre 10 y 100
        console.log('Número aleatorio generado: ' + this.numrand); // Mostrar en consola
    }
    generarAleatorio2() {
        // Generar un múltiplo de 10 entre 200 y 350
        this.numrand2 = Math.floor(Math.random() * ((350 - 200) / 10 + 1)) * 10 + 200;
        console.log('Número 2 aleatorio generado: ' + this.numrand2);
    }
    
    
    createSecondRentaro() {
        // Asegúrate de que el segundo Rentaro no se cree si ya existe
        if (this.rentaro2) return;
        this.rentaroValue2 = 50;

        this.rentaroTimeLeft2 = 10; // Reinicia el tiempo
        const x = Phaser.Math.Between(100, 1400);
        const y = 0; // Aparece en la parte superior de la pantalla
        this.rentaro2 = this.physics.add.sprite(x, y, 'RentaroR').setScale(0.1);
        this.rentaro2.setCollideWorldBounds(true);
        this.rentaro2.setBounce(1); // Permitir que rebote
        this.rentaro2.setGravityY(300); // Establecer gravedad para que caiga

        // Hacer que Rentaro parpadee
        this.rentaroBlinking2 = true;
        this.rentaroTimer2 = this.time.addEvent({
            delay: 100, // Cambiar cada 100 ms
            callback: this.blinkRentaro2,
            callbackScope: this,
            loop: true
        });
        
        this.rentaroTimerText2.setVisible(true);
        this.rentaroTimerText2.setText('Tiempo: ' + this.rentaroTimeLeft2); // Actualiza el texto

        this.rentaroTimerEvent2 = this.time.addEvent({
            delay: 1000, // 1 segundo
            callback: () => {
                this.rentaroTimeLeft2--;
                this.rentaroTimerText2.setText('Tiempo: ' + this.rentaroTimeLeft2); // Actualiza el texto
        
                // Si el tiempo llega a 0, destruye Rentaro
                if (this.rentaroTimeLeft2 <= 0) {
                    this.rentarovalue2=10;
                    this.rentaroTimerText2.setVisible(false);
                    this.rentaroTimerEvent2.remove(); // Detener el temporizador
                }
            },
            callbackScope: this,
            loop: true // Repetir el evento
        });
                // Desactivar el parpadeo después de 10 segundos
                this.time.delayedCall(10000, () => {
                    this.rentaroBlinking2 = false;
                    this.rentaro2.setTint(0xffffff); // Restablecer color
                    this.rentaroTimer2.remove(); // Detener el parpadeo
                });
        

        // Detectar si el jugador recoge a Rentaro
        this.physics.add.collider(this.rentaro2, this.platforms);
        this.physics.add.overlap(this.player, this.rentaro2, this.collectRentaro2, null, this);

        // Iniciar el movimiento de Rentaro
        this.moveRentaro2();
    }

    moveRentaro2() {
        if (!this.rentaro2) return;

        // Movimiento horizontal de Rentaro
        const direction = Phaser.Math.Between(-1, 1); // Movimiento a la izquierda (-1) o a la derecha (1)
        const speedX = 200; // Velocidad de movimiento horizontal

        // Establecer velocidad horizontal
        this.rentaro2.setVelocityX(direction * speedX); // Velocidad horizontal

        // Configurar colisión con los límites del mundo y rebote
        this.rentaro2.setCollideWorldBounds(true);
        this.rentaro2.setBounce(1); // Permitir rebote en los límites del mundo

        // Hacer que Rentaro parpadee mientras se mueve
        this.rentaroBlinking = true;
        this.rentaroTimer2 = this.time.addEvent({
            delay: 100, // Cambiar cada 100 ms
            callback: this.blinkRentaro2,
            callbackScope: this,
            loop: true
        });

            // Desactivar el parpadeo después de 10 segundos
        this.time.delayedCall(10000, () => {
            this.rentaroBlinking2 = false;
            this.rentaro2.setTint(0xffffff); // Restablecer color
            if (this.rentaroTimer2) {
                this.rentaroTimer2.remove(); // Detener el parpadeo
            }
        });

        // Añadir un evento de actualización para verificar la posición de Rentaro
        this.time.addEvent({
            delay: 100, // Comprobar cada 100 ms
            callback: () => {
                if (this.rentaro2 && this.rentaro2.body) { // Verifica que rentaro esté definido
                    // Cambiar la textura según la dirección de movimiento
                    if (this.rentaro2.body.velocity.x < 0) {
                        this.rentaro2.setTexture('Rentaro'); // Cambiar a la imagen de Rentaro si se mueve a la izquierda
                    } else if (this.rentaro2.body.velocity.x > 0) {
                        this.rentaro2.setTexture('RentaroR'); // Cambiar a la imagen de RentaroR si se mueve a la derecha
                    }

                    // Verificar límites de la pantalla
                    if (this.rentaro2.x >= 1420) {
                        this.rentaro2.setVelocityX(-speedX); // Cambiar dirección
                    } else if (this.rentaro2.x <= 80) {
                        this.rentaro2.setVelocityX(speedX); // Cambiar dirección
                    }
                }
            },
            callbackScope: this,
            loop: true // Repetir el evento
        });
    }

    blinkRentaro2() {
        if (this.rentaroBlinking2 && this.rentaro2) { // Verificar si rentaro2 existe
            const randomColor = Phaser.Display.Color.RandomRGB();
            this.rentaro2.setTint(randomColor.color);
        }
    }

    collectRentaro2(player, rentaro) {
        rentaro.disableBody(true, true);
        this.score += this.rentaroValue2; ; // Rentaro vale 50 puntos
        this.jugador.puntos = this.score;
        this.scoreText.setText('Score: ' + this.score);
        this.jugador.guardar();
        this.rentaro2.destroy();
        this.rentaro2 = null; // Limpiar la referencia

        // Detener el temporizador y ocultar el texto
        if (this.rentaroTimerEvent2) {
            this.rentaroTimerEvent2.remove(); // Detener el temporizador
        }
        this.rentaroTimerText2.setVisible(false); // Ocultar el texto del temporizador
    }

completeLevel() {
    // Detener música y sonidos
    pauseButton.style.display = 'none';
    this.musicafondo.stop();
    this.SonidoMuerte.stop();
    this.sonidoaAHahari.stop();
    this.SonidosQuietas.forEach((sonido) => sonido.stop());
    this.sonidoaAHahari.stop();
    this.pelucheSonido.stop();
    
    // Cambiar el color de fondo a negro
    this.cameras.main.setBackgroundColor('#000000'); // Establecer el fondo de la cámara a negro
    this.physics.pause(); // Pausar la física

    // Eliminar todos los elementos del juego
    this.children.removeAll(); // Eliminar todos los objetos hijos del juego

    // Mostrar el mensaje "Nivel 1 Completo"
    const levelCompleteText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Nivel 1 Completo', {
        fontSize: '64px',
        fill: '#ffffff'
    }).setOrigin(0.5); // Centrar el texto

    // Opcional: Agregar un temporizador para reiniciar el nivel o ir a otro
    this.time.delayedCall(2000, () => {
        window.location.href = 'nivel2.html'; 
    });
}
}