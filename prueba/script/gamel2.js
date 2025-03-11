class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });

        // Propiedades de la clase (antes variables globales)
        this.player = null;          // Jugador
        
        this.bombs = null;           // Grupo de bombas
        this.suelo=null;
        this.platforms = null;       // Plataformas del juego
        this.cursors = null;         // Teclas del cursor (flechas)
        this.score = 0;              // Puntuación del jugador
        this.gameOver = false;       // Estado del juego (si ha terminado)
        this.scoreText = null;       // Texto que muestra la puntuación
        this.icono = null;
        this.personaje = 1;          // Selección de personaje
        this.isPaused = false; // Estado de pausa
        this.ataque = null; // Grupo para los ataques
        this.ataqueK    = null; // Tecla para atacar
        this.attackActive = false; // Variable para controlar el estado del ataque
        this.attackCooldown = 200; // Tiempo de espera entre ataques en milisegundos
        this.lastAttackTime = 0; // Tiempo del último ataque        

        // Música y sonidos
        this.musicafondo = null;     // Música de fondo
        this.SonidosQuietas = [];    // Sonidos de idle
        this.SonidoMuerte = null;    // Sonido al morir
        this.cancionrandom = 0;      // Tiempo para reproducir sonidos de idle
        this.delaycancion = Phaser.Math.Between(5000, 10000); // Delay entre sonidos de idle
        this.sonidoDano = null;
        // Instancia de la clase Jugador
        this.jugador = null;
        //Enemigos
        this.lives = 3;  // Inicialmente, el jugador tiene 3 vidas
        this.ImagenVida = [];

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
        this.load.image('sky', 'assets/fondoN2.jpg');       // Fondo del juego
        this.load.image('groundsmall', 'assets/plataforma.png'); // Plataforma
        this.load.image('ground', 'assets/plataforma2.png'); // Plataforma     // Estrella
        this.load.image('vacio', 'assets/vacio.png');

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
        this.load.audio('Shizuka_muerteS', 'assets/Shizuka/MuerteShizuka.mp3');
        this.load.audio('Shizuka_paradaS', 'assets/Shizuka/DialogoShizuka.mp3');
        this.load.audio('Shizuka_paradaS2', 'assets/Shizuka/Dialogo2Shizuka.mp3');
        this.load.audio('Shizuka_paradaS3', 'assets/Shizuka/DialogoShizuka3.mp3');
        this.load.audio('Shizuka_paradaS4', 'assets/Shizuka/DialogoShizuka4.mp3');
        this.load.audio('Shizuka_paradaS5', 'assets/Shizuka/DialogoShizuka5.mp3');
        this.load.audio('Shizuka_Dano', 'assets/Shizuka/ShizukaDano.mp3');
        // NANO
        this.load.audio('Nano_muerteS', 'assets/Nano/muertenano.mp3');
        this.load.audio('Nano_paradaS', 'assets/Nano/NanoDialogo2.mp3');
        this.load.audio('Nano_paradaS2', 'assets/Nano/NanoDialogo3.mp3');
        this.load.audio('Nano_paradaS3', 'assets/Nano/DialogoNano.mp3');
        this.load.audio('Nano_Dano', 'assets/Nano/NanoGolpe.mp3');
        //Enemigos
        this.load.image('bomb', 'assets/Enemigos/atacke.png');

        //objeto especial
        this.load.image('vidas', 'assets/objetos/Corazones.png');
        this.load.image('ataquaAliado', 'assets/objetos/Ataque.png');



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

        // Recuperar el volumen guardado


        this.idleTimer = 0;
        this.lastUpdateTime = 0;
        // Añade el fondo del juego
        let sky = this.add.image(750, 400, 'sky');
        sky.setDisplaySize(1500, 800); // Ajusta al tamaño de la pantalla

        // Crea un grupo de plataformas estáticas (no se mueven)
        this.platforms = this.physics.add.staticGroup();
        this.suelo = this.physics.add.staticGroup();
        
        // Crea el suelo del juego y lo escala para que cubra el ancho de la pantalla
            
        for (let x = 0; x <= 1500; x += 30) {
            this.suelo.create(x, 745, 'groundsmall').setScale(0.8).refreshBody();
        }
        this.suelo.children.iterate((platform) => {
            platform.setTint(0xDD4444); // Aplica color rojo
        });

        this.playerNameText = this.add.text(16, 100, 'Jugador: ' + this.jugador.nombre, {
            fontSize: '32px',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF',
            fill: '#ffffff'
        });


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
        this.platforms.children.iterate((platform) => {
            platform.setTint(0xDD4444); // Aplica color rojo
        });
        this.platforms.children.iterate((platform) => {
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.up = true;   
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
        });

        // Crea al jugador en una posición inicial
        if (this.personaje == 1) {
            this.player = this.physics.add.sprite(100, 650, 'Nano_parada').setScale(0.2);

        } else if (this.personaje == 2) {
            this.player = this.physics.add.sprite(100, 650, 'Shizuka_parada').setScale(0.2);

        }


        this.rentaroTimerText = this.add.text(16, 160, 'Tiempo: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF',
        });
        this.rentaroTimerText.setVisible(false);

        this.rentaroTimerText2 = this.add.text(16, 190, 'Tiempo: 0', { 
            fontSize: '32px', 
            fill: 'ffffff',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF', });
            
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

            this.anims.create({
                key: 'agacharse',
                frames: [{ key: 'Nano_quieta', frame: 1 }], 
                frameRate: 10,
                repeat: -1
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
            
            this.anims.create({
                key: 'agacharse',
                frames: [{ key: 'Shizuka_muerte', frame: 1 }], 
                frameRate: 10,
                repeat: -1
            });


        }

        // Sonidos
        if (this.personaje == 1) {  // Nano
            this.SonidosQuietas = [
                this.sound.add('Nano_paradaS'),
                this.sound.add('Nano_paradaS2'),
                this.sound.add('Nano_paradaS3')
            ];
            this.SonidoMuerte = this.sound.add('Nano_muerteS');
            this.sonidoDano = this.sound.add('Nano_Dano')

        } else if (this.personaje == 2) {  // Shizuka
            this.SonidosQuietas = [
                this.sound.add('Shizuka_paradaS'),
                this.sound.add('Shizuka_paradaS2'),
                this.sound.add('Shizuka_paradaS3'),
                this.sound.add('Shizuka_paradaS4'),
                this.sound.add('Shizuka_paradaS5')
            ];
            this.SonidoMuerte = this.sound.add('Shizuka_muerteS');
            this.sonidoDano = this.sound.add('Shizuka_Dano')
        }

        // Llama a setVolume después de inicializar los sonidos
        let savedVolume = localStorage.getItem("gameVolume");
        if (savedVolume !== null) {
            this.setVolume(parseFloat(savedVolume)); // Asegúrate de convertir a número
        } else {
            this.setVolume(0.5); // Valor por defecto
        }

        // Configura las teclas del cursor para mover al jugador
        this.cursors = this.input.keyboard.createCursorKeys();


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
        this.scoreText = this.add.text(16, 130, 'score: 0', {
            fontFamily: 'Aclonica , sans-serif',
            fontSize: '32px',
            color: '#FFFFFF',
            fill: '#FFFFFF',
        });

        // Añade colisiones entre el jugador, las estrellas y las plataformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.suelo);
        // Detecta si el jugador choca con una bomba
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.ataque = this.physics.add.group(); // Grupo para los ataques
        this.ataqueK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.physics.add.collider(this.ataque, this.suelo, this.destroyAttack, null, this);
       
    }

    setVolume(volume) {
        // Asegúrate de que this.musicafondo no sea null
        if (this.musicafondo) {
            this.musicafondo.setVolume(volume);
        } else {
            console.error("La música de fondo no está inicializada.");
        }

        // Aplicar el volumen a otros sonidos si es necesario
        this.SonidosQuietas.forEach(sonido => {
            if (sonido) {
                sonido.setVolume(volume);
            }
        });

        if (this.SonidoMuerte) {
            this.SonidoMuerte.setVolume(volume);
        }
        if (this.sonidoDano) {
            this.sonidoDano.setVolume(volume);
        }
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
        const currentTime = this.time.now;
        // Lógica de movimiento
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
        }else if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(300);
            this.player.anims.play('agacharse', true);
            this.platforms.children.iterate((platform) => {
                platform.body.checkCollision.up = false;   

            });
        }else {
            this.player.setVelocityX(0);
            this.idleTimer += time - (this.lastUpdateTime || time);
            this.lastUpdateTime = time;
            this.platforms.children.iterate((platform) => {
                platform.body.checkCollision.up = true;   

            });
    
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
    
        // Lógica de salto
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.idleTimer = 0;
            if (this.personaje == 1) {
                this.player.setTexture('Nano_brinca');
            } else if (this.personaje == 2) {
                this.player.setTexture('Shizuka_parada2');
            }
        }

        const arriba = this.cursors.up.isDown;
        const abajo = this.cursors.down.isDown;
        const izquierda = this.cursors.left.isDown;
        const derecha = this.cursors.right.isDown;
    

  
        if (this.ataqueK.isDown && (currentTime - this.lastAttackTime > this.attackCooldown)) {
            // Verificar las teclas de flecha
                // Determinar la dirección del ataque
            if (arriba && izquierda) {
                this.launchAttack('up-left');
            } else if (arriba && derecha) {
                this.launchAttack('up-right');
            } else if (abajo && izquierda) {
                this.launchAttack('down-left');
            } else if (abajo && derecha) {
                this.launchAttack('down-right');
            } else if (arriba) {
                this.launchAttack('up');
            } else if (abajo) {
                this.launchAttack('down');
            } else if (izquierda) {
                this.launchAttack('left');
            } else if (derecha) {
                this.launchAttack('right');
            }
        } 
        this.ataque.children.iterate((ataque) => {
            if (ataque && ataque.lifespan <= 0) {
                ataque.destroy();
            } else if (ataque) {
                ataque.lifespan -= this.time.delta; // Resta el tiempo transcurrido
            }
        });

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


    completeLevel() {
        // Detener música y sonidos
        pauseButton.style.display = 'none';
        this.musicafondo.stop();
        this.SonidoMuerte.stop();
        this.sonidoaAHahari.stop();
        this.SonidosQuietas.forEach((sonido) => sonido.stop());


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
            window.location.href = 'rompecabezas.html';
        });
    }


    launchAttack(direction) {
        this.attackActive = true; // Establecer el ataque como activo
        this.lastAttackTime = this.time.now; // Actualizar el tiempo del último ataque

        const ataque = this.ataque.create(this.player.x, this.player.y, 'ataquaAliado');
        ataque.setScale(0.06);
        ataque.lifespan = 800; 
    
        switch (direction) {
            case 'left':
                ataque.setVelocityX(-850);
                break;
            case 'right':
                ataque.setVelocityX(850);
                break;
            case 'up':
                ataque.setVelocityY(-850);
                break;
            case 'down':
                ataque.setVelocityY(850);
                break;
            case 'up-left':
                ataque.setVelocityX(-850);
                ataque.setVelocityY(-850);
                break;
            case 'up-right':
                ataque.setVelocityX(850);
                ataque.setVelocityY(-850);
                break;
            case 'down-left':
                ataque.setVelocityX(-850);
                ataque.setVelocityY(850);
                break;
            case 'down-right':
                ataque.setVelocityX(850);
                ataque.setVelocityY(850);
                break;
            default:
                ataque.setVelocityX(850);
                ataque.setVelocityY(850);
                break;
        }
    
        this.time.delayedCall(ataque.lifespan, () => {
            ataque.destroy();
        });
    }
    destroyAttack(ataque) {
        ataque.destroy(); // Destruir el ataque
    }

    hitEnemy(attack, enemy) {
        attack.destroy(); // Destruir el ataque
        enemy.destroy(); // Destruir el enemigo (o aplicar daño)
    }
}