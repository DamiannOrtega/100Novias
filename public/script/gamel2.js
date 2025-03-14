class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });

        // Propiedades de la clase 
        this.player = null;          // Jugador
        this.playerPosition = { x: 0, y: 0 };
        this.magia = null;           // Grupo de bombas
        this.suelo = null;
        this.platforms = null;       // Plataformas del juego
        this.cursors = null;         // Teclas del cursor (flechas)
        this.trailGroup = null;
        // this.score = 0;              // Puntuación del jugador
        this.gameOver = false;       // Estado del juego (si ha terminado)
        this.scoreText = null;       // Texto que muestra la puntuación
        this.dateText = null         // Texto para la fecha
        this.currentLevel = 2;       // Nivel actual
        this.icono = null;
        this.personaje = 1;          // Selección de personaje
        this.isPaused = false; // Estado de pausa
        this.ataque = null; // Grupo para los ataques
        this.ataqueK = null; // Tecla para atacar
        this.attackActive = false; // Variable para controlar el estado del ataque
        this.attackCooldown = 200; // Tiempo de espera entre ataques en milisegundos
        this.lastAttackTime = 0; // Tiempo del último ataque        
        this.lastDashTime = 0; // Tiempo de la última pulsación
        this.dashCooldown = 1000; // Tiempo en milisegundos para considerar un doble toque
        this.isDashing = false; // Estado del dash
        this.dashSpeed = 3000; // Velocidad del dash
        // Música y sonidos
        this.musicafondo = null;     // Música de fondo
        this.SonidosQuietas = [];    // Sonidos de idle
        this.SonidoMuerte = null;    // Sonido al morir
        this.cancionrandom = 0;      // Tiempo para reproducir sonidos de idle
        this.delaycancion = Phaser.Math.Between(5000, 10000); // Delay entre sonidos de idle
        this.sonidoDano = null;
        this.isMuted = false; // Estado de muteo
        // Instancia de la clase Jugador
        this.jugador = null;
        this.lives = null;  // Inicialmente, el jugador tiene 3 vidas
        this.ImagenVida = [];
        this.ImagenVidaBoss = [];
        //Enemigos
        this.bossIcon = null;
        this.bosslife = null;
        this.bossAlive = true;
        this.bosslives = 15;
        this.boss = null;
        this.sonidoBoss = null;
        this.bossMoveSpeed = 200; // Velocidad inicial del jefe
        this.bossAttackSpeed = 1500; // Tiempo entre ataques inicial
        this.ataqueE = null; // Grupo para los ataques
        this.bossAttackCooldown = 1000; // Tiempo de espera entre ataques del jefe
        this.lastBossAttackTime = 0;
        this.bossHasStartedMoving = false;
        this.bossIsMoving = false; // Inicialmente, el jefe no se está moviendo
        this.timeLeft = 60; // Tiempo inicial en segundos
        this.scoreMultiplier = 15; // Multiplicador de puntuación
        this.timerText = null; // Texto para mostrar el tiempo
        this.scoreMultiplierText = null; // Texto para mostrar el multiplicador
        this.gameOverTriggered = false; // Indica si el Game Over ya ha sido activado        
        this.phaseText = null; // Texto para mostrar la fase del jefe
        //sonidos del jefe
        this.pBoss=null;
        this.hit1=null;
        this.hit2=null;
        this.hit3=null;
        this.hitNormal=null;
        this.puntospartida=0;
        this.score=0;
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

        const vidasGuardadas = localStorage.getItem('vidasActuales');
        if (vidasGuardadas !== null) {
            this.lives = parseInt(vidasGuardadas, 10);
        }

        const puntosGuardados = localStorage.getItem(this.jugador.puntos);
        this.puntospartida = parseInt(localStorage.getItem('puntuacionNivel1')) || 0;

     
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
        this.load.audio('musica_fondo', 'assets/Sounds/level2.mp3');
        this.load.audio('SoundBoss', 'assets/Sounds/apareceBoss.mp3');

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
        this.load.image('mahou', 'assets/Enemigos/ataqueEnemigo.png');
        this.load.image('IconoBoss', 'assets/Enemigos/VidaBoss.png');
        this.load.image('Barra_Vida', 'assets/Enemigos/BarradeVida.png');
        this.load.image('Dios_Amor', 'assets/Enemigos/Dios_malo.png');
        this.load.audio('Presentacion_Boss', 'assets/Enemigos/PresentacionBoss.mp3');
        this.load.audio('hit1', 'assets/Enemigos/daño.mp3');
        this.load.audio('hit2', 'assets/Enemigos/hit1.mp3');
        this.load.audio('hit3', 'assets/Enemigos/hit2.mp3');
        this.load.audio('hit4', 'assets/Enemigos/hit3.mp3');

        //objeto especial
        this.load.image('vidas', 'assets/objetos/Corazones.png');
        this.load.image('ataquaAliado', 'assets/objetos/Ataque.png');
        this.load.image('attackBoss', 'assets/Enemigos/ataqueEnemigo.png');

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
        this.dashKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

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

        //Mostrar punto guardados
        this.scoreText = this.add.text(16, 134, 'Score: ' + this.puntospartida, {
            fontSize: '32px',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF',
            fill: '#ffffff'
        });
        // this.scoreText.setText('Score: ' + this.jugador.puntos);


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
        this.sonidoBoss = this.sound.add('SoundBoss');
        this.pBoss = this.sound.add('Presentacion_Boss');
        this.hitNormal = this.sound.add('hit1');
        this.hit1 = this.sound.add('hit2');
        this.hit2 = this.sound.add('hit3');
        this.hit3 = this.sound.add('hit4');


        this.boss = this.physics.add.sprite(750, 30, 'Dios_Amor').setScale(0.25);
        this.boss.setVisible(false);

        this.sonidoBoss.play();

        this.time.delayedCall(1000, () => {
            this.boss.body.allowGravity = false;
            this.boss.setVisible(true);
            this.boss.body.immovable = true;
            this.boss.setVelocity(0);
            this.pBoss.play();
            this.boss.invulnerable = true; // Hacer que el jefe sea inmune
            this.time.delayedCall(5000, () => {
                this.phaseText.setText('Fase 1'); // Mostrar texto de fase 2
                this.time.delayedCall(2000, () => {
                    this.phaseText.setText(''); // Limpiar el texto después de 2 segundos
                });
                this.boss.invulnerable = false; // El jefe ya no es inmune después de 5 segundos
                this.bossIcon = this.add.image(1200, 70, 'IconoBoss').setScale(0.7);
                for (let i = 0; i < this.bosslives; i++) {
                    const vidaImage = this.add.image(1160 + (i * 14), 65, 'Barra_Vida').setScale(0.7);
                    this.ImagenVidaBoss.push(vidaImage);
                }
                this.startBossBehavior();
            });
        });

        this.musicafondo = this.sound.add('musica_fondo', { loop: true, volume: 0.5 });

        this.time.delayedCall(26000, () => {
            this.musicafondo.play();
        });

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
            color: '#FFFFFF',
        });

        // Obtener la fecha actual
        const currentDate = new Date().toLocaleDateString(); // Formato de fecha
        this.dateText = this.add.text(this.cameras.main.width - 200, this.cameras.main.height - 50, `Fecha: ${currentDate}`, {
            fontFamily: 'Aclonica , sans-serif',
            fontSize: '32px',
            color: '#FFFFFF',
            fill: '#ffff',
        }).setOrigin(0.5, 0); // Alinear a la derecha y abajo

        // Crear el texto para mostrar el nivel en la esquina inferior izquierda
        this.levelText = this.add.text(16, this.cameras.main.height - 30, `Nivel: ${this.currentLevel}`, {
            fontFamily: 'Aclonica , sans-serif',
            fontSize: '32px',
            color: '#ffff', // Color blanco
            fill: '#FFFFFF',
        }).setOrigin(0, 0.5); // Alinear a la izquierda y abajo

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


        this.timerText = this.add.text(760, 50, `${this.timeLeft}`, {
            fontSize: '32px',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF',
            fill: '#ffffff'
        });
        
        this.scoreMultiplierText = this.add.text(16, 250, `Multiplicador: x${this.scoreMultiplier}`, {
            fontSize: '32px',
            fontFamily: 'Aclonica , sans-serif',
            color: '#FFFFFF',
            fill: '#ffffff'
        });
        
        // Iniciar el temporizador
        this.time.addEvent({
            delay: 1000, // Cada segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
            
        });

        this.phaseText = this.add.text(780, 100, '', {
            fontSize: '32px',
            fontFamily: 'Aclonica, sans-serif',
            color: '#FFFFFF',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5); // Centrar el texto

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


        // Añade colisiones entre el jugador, las estrellas y las plataformas
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.suelo);
        this.physics.add.collider(this.boss, this.suelo);

        // Detecta si el jugador choca con una bomba
        this.ataque = this.physics.add.group(); // Grupo para los ataques
        this.trailGroup = this.physics.add.group()
        this.ataqueE = this.physics.add.group(); // Grupo para los ataques

        this.physics.add.collider(this.ataqueE, this.suelo, this.destroyAttack, null, this);

        this.physics.add.collider(this.ataqueE, this.player, this.hitPlayer, null, this);
        this.physics.add.collider(this.ataque, this.boss, this.hitEnemy, null, this);
        this.ataqueK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.physics.add.collider(this.ataque, this.suelo, this.destroyAttack, null, this);

        // Agregar eventos a los botones
        document.getElementById('restartButton').addEventListener('click', () => {
            // Reiniciar el juego
            window.location.href = 'juego.html'; // Recargar la página para reiniciar el juego
        });

        // El botón de menú principal es un enlace, así que no necesita un evento adicional
        document.getElementById('menuButton').addEventListener('click', () => {
            // Redirigir al menú principal
            window.location.href = 'index.html'; // Cambia 'index.html' por la ruta de tu menú principal
        });
        // Evento de Mute
        const muteButton = document.getElementById('muteButton');
        muteButton.addEventListener('click', () => {
            this.toggleMute();
        });
    }

    setVolume(volume) {
        if (this.musicafondo) {
            this.musicafondo.setVolume(volume);
        } else {
            console.error("La música de fondo no está inicializada.");
        }
        if (this.sonidoBoss) {
            this.sonidoBoss.setVolume(volume);
        } else {
            console.error("La música de fondo no está inicializada.");
        }
        if (this.pBoss) {
            this.pBoss.setVolume(volume);
        } else {
            console.error("error.");
        }

        if (this.hit1) {
            this.hit1.setVolume(volume);
        } else {
            console.error("error.");
        }

        if (this.hit2) {
            this.hit2.setVolume(volume);
        } else {
            console.error("error.");
        }
        if (this.hitNormal) {
            this.hitNormal.setVolume(volume);
        } else {
            console.error("error.");
        }
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
        // Actualizar la posición del jugador
        this.playerPosition.x = this.player.x;
        this.playerPosition.y = this.player.y;
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
            // Detección de doble toque para dash
            // Detección de dash
            if (this.dashKey.isDown && !this.isDashing) {
                this.createTrail();

                this.dash('left');
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk_right', true);
            this.idleTimer = 0; // Resetea el temporizador de inactividad
            this.lastUpdateTime = 0;
            this.SonidosQuietas.forEach((sonido) => sonido.stop());


            // Detección de dash
            if (this.dashKey.isDown && !this.isDashing) {
                this.createTrail();
                this.dash('right');
            }
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(300);
            this.player.anims.play('agacharse', true);
            this.platforms.children.iterate((platform) => {
                platform.body.checkCollision.up = false;

            });
        } else {
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
        this.ataqueE.children.iterate((ataque) => {
            if (ataque && ataque.lifespan <= 0) {
                ataque.destroy();
            } else if (ataque) {
                ataque.lifespan -= this.time.delta; // Resta el tiempo transcurrido
            }
        });

        // Actualizar la fecha si es necesario
        const currentDate = new Date().toLocaleDateString();
        this.dateText.setText(`Fecha: ${currentDate}`);
        // Mostar el nivel
        this.levelText.setText(`Nivel: ${this.currentLevel}`);
    }

    showGameOver() {
        // Detener música y sonidos
        this.musicafondo.stop();
        this.sonidoBoss.stop();
        this.SonidosQuietas.forEach((sonido) => sonido.stop());
        this.sonidoDano.stop();

        // Pausar la física
        this.physics.pause();

        // Agregar la clase de difuminado al canvas del juego
        const canvas = document.querySelector('canvas');
        canvas.classList.add('blur');
        this.timerText.setVisible(false); // Ocultar el texto del temporizador
        this.scoreMultiplierText.setVisible(false); // Ocultar el texto del multiplicador
        const isMuted = document.getElementById('muteButton');
        isMuted.style.display= 'none'; // Estado de muteo

        // Mostrar el canvas de Game Over
        const gameOverCanvas = document.getElementById('gameOverCanvas');
        gameOverCanvas.style.display = 'block';
        gameOverCanvas.width = 1500; // Ajusta el ancho según tu juego
        gameOverCanvas.height = 800; // Ajusta la altura según tu juego

        const context = gameOverCanvas.getContext('2d');

        // Limpiar el canvas antes de dibujar
        context.clearRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);

        // Inicializar la opacidad y las posiciones del texto
        let opacity = 0;
        let gameYPosition = -100; // Comienza fuera de la pantalla (arriba)
        let overYPosition = gameOverCanvas.height + 100; // Comienza fuera de la pantalla (abajo)

        // Función para animar el texto
        const animateText = () => {
            // Limpiar el canvas
            context.clearRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);

            // Aumentar la opacidad
            opacity += 0.05; // Incrementar la opacidad
            if (opacity > 1) opacity = 1; // Limitar la opacidad a 1

            // Actualizar las posiciones de las palabras
            gameYPosition += 5; // Mover "GAME" hacia abajo
            overYPosition -= 5; // Mover "OVER" hacia arriba

            // Dibujar el texto de GAME
            context.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Color rojo con opacidad
            context.font = '64px Aclonica'; // Tamaño de fuente
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('GAME', gameOverCanvas.width / 2 - 100, gameYPosition); // Desplazar a la izquierda

            // Dibujar el texto de OVER
            context.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Color rojo con opacidad
            context.fillText('OVER', gameOverCanvas.width / 2 + 100, overYPosition); // Desplazar a la derecha
            pauseButton.style.display = 'none'; // Ocultar el botón de pausa
            // Continuar la animación hasta que ambas palabras se junten
            if (gameYPosition < gameOverCanvas.height / 2 && overYPosition > gameOverCanvas.height / 2) {
                requestAnimationFrame(animateText);
            } else {
                // Opcional: Agregar un temporizador para reiniciar el juego o ir a otro lugar
                this.time.delayedCall(1500, () => {
                    document.getElementById('gameOverButtons').style.display = 'flex'; // Cambiar a 'flex' para mostrar los botones
                    document.getElementById('restartButton').style.display = 'block'; // Mostrar el botón de reiniciar
                    document.getElementById('menuButton').style.display = 'block'; // Mostrar el botón de menú principal
                });
            }
        };

        // Iniciar la animación
        animateText();
    }


    togglePause() {
        this.isPaused = !this.isPaused; // Cambiar el estado de pausa
        const canvas = document.querySelector('canvas');
        const pauseButton = document.getElementById('pauseButton');
        const resumeButton = document.getElementById('resumeButton');
        const isMuted = document.getElementById('muteButton');

        if (this.isPaused) {
            this.physics.pause(); // Pausar la física
            this.musicafondo.pause(); // Pausar la música de fondo
            canvas.classList.add('blur'); // Agregar la clase de desenfoque al canvas
            pauseButton.style.display = 'none'; // Ocultar el botón de pausa
            resumeButton.style.display = 'flex'; // Mostrar el botón de reanudar
            isMuted.style.display = 'none';
            this.SonidosQuietas.forEach((sonido) => {
                if (sonido.isPlaying) {
                    sonido.pause();
                }
            });

            if (this.sonidoBoss.isPlaying) {
                this.sonidoBoss.pause();
            }

            if (this.pBoss.isPlaying) {
                this.pBoss.pause();
            }
            if (this.hit1.isPlaying) {
                this.hit1.pause();
            }
            if (this.hit2.isPlaying) {
                this.hit2.pause();
            }

            if (this.hitNormal.isPlaying) {
                this.hitNormal.pause();
            }

            // Aquí puedes pausar otros sonidos si es necesario
        } else {
            this.physics.resume(); // Reanudar la física
            this.musicafondo.resume(); // Reanudar la música de fondo
            canvas.classList.remove('blur'); // Agregar la clase de desenfoque al canvas
            pauseButton.style.display = 'flex'; // Mostrar el botón de pausa
            resumeButton.style.display = 'none'; // Ocultar el botón de reanudar
            isMuted.style.display = 'flex';
            this.SonidosQuietas.forEach((sonido) => {
                if (sonido.isPaused) {
                    sonido.resume();
                }
            });

            if (this.sonidoBoss.isPaused) {
                this.sonidoBoss.resume();
            }
             if (this.pBoss.isPaused) {
                this.pBoss.resume();
            }
            if (this.hit1.isPaused) {
                this.hit1.resume();
            }
            if (this.hit2.isPaused) {
                this.hit2.resume();
            }
            if (this.hitNormal.isPaused) {
                this.hitNormal.resume();
            }

        }
    }
    completeLevel() {
        // Detener música y sonidos
        pauseButton.style.display = 'none';
        this.musicafondo.stop();
        this.SonidoMuerte.stop();
        this.SonidosQuietas.forEach((sonido) => sonido.stop());


        // Cambiar el color de fondo a negro
        this.physics.pause(); // Pausar la física

        // Eliminar todos los elementos del juego
        this.children.removeAll(); // Eliminar todos los objetos hijos del juego
        // Comparar la puntuación acumulada con la puntuación del nivel 1
        this.jugador.puntos=this.puntospartida; // Actualizar la puntuación
        this.jugador.guardar();
        
        // Opcional: Agregar un temporizador para reiniciar el nivel o ir a otro
        this.time.delayedCall(500, () => {
            window.location.href = 'pantallaWin.html';
        });
    }

    launchAttack(direction) {
        this.attackActive = true; // Establecer el ataque como activo
        this.lastAttackTime = this.time.now; // Actualizar el tiempo del último ataque

        const ataque = this.ataque.create(this.player.x, this.player.y, 'ataquaAliado');
        ataque.setScale(0.04);
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
        ataque.destroy();
    }


    hitEnemy(enemy, attack) {
        // Resta una vida al jefe
        if (!this.bossIsMoving) {
            attack.destroy(); // Destruir el ataque
            console.log("El jefe no está en movimiento, no se le puede hacer daño.");
            return; // No hacer nada si el jefe no se está moviendo
        }
        this.hitNormal.play();
        this.bosslives--;
        console.log("Vidas del jefe restantes: ", this.bosslives);
    
        // Cambiar el color del jefe a rojo
        enemy.setTint(0xff0000);
        console.log("El jefe ha sido golpeado y su color ha cambiado a rojo.");
    
        // Eliminar la última imagen de vida del jefe
        if (this.ImagenVidaBoss.length > 0) {
            const vidaImage = this.ImagenVidaBoss.pop(); // Eliminar la última imagen de vida
            vidaImage.destroy(); // Destruir la imagen de vida
            console.log("Se ha eliminado una imagen de vida del jefe.");
        }

        this.updateScore(); 
        
        // Verificar si el jefe ha perdido todas sus vidas
        if (this.bosslives <= 0) {
            // Lógica para cuando el jefe es derrotado
            console.log("El jefe ha sido derrotado.");
            enemy.destroy(); // Destruir el jefe
            this.bossAlive = false; // Marcar que el jefe ha sido derrotado
            this.bossAttackEvent.remove();
            this.scoreText.setText('¡Jefe Derrotado!'); // Mensaje de victoria
            this.completeLevel();
        } else {
            // Ajustar velocidad y tiempo de ataque según las vidas restantes
            if (this.bosslives % 5 === 0) { // Cada 5 vidas perdidas
                if (this.bosslives === 10) {
                    this.hit2.play();
                    this.phaseText.setText('Fase 2'); // Mostrar texto de fase 2
                    this.time.delayedCall(2000, () => {
                        this.phaseText.setText(''); // Limpiar el texto después de 2 segundos
                    });
                } else if (this.bosslives === 5) {
                    this.hit3.play();
                    this.phaseText.setText('Fase 3'); // Mostrar texto de fase 3
                    this.time.delayedCall(2000, () => {
                        this.phaseText.setText(''); // Limpiar el texto después de 2 segundos
                    });
                }
    
                this.bossMoveSpeed += 150; // Aumentar la velocidad de movimiento
                this.bossAttackSpeed -= 600; // Disminuir el tiempo entre ataques
                this.bossAttackEvent.delay = this.bossAttackSpeed; // Actualizar el evento de ataque
                console.log("El jefe se mueve más rápido y ataca más rápido.");
            }
    
            // Si el jefe aún tiene vidas, puedes agregar un efecto visual o sonido
            this.time.delayedCall(500, () => {
                enemy.clearTint(); // Limpiar el tinte del jefe después de un tiempo
                console.log("El tinte del jefe ha sido limpiado.");
            });
        }
    
        // Destruir el ataque después de un tiempo
        attack.destroy(); // Destruir el ataque
        console.log("El ataque ha sido destruido.");
    }


    startBossBehavior() {
        this.boss.setVelocity(0); // Inicialmente detenido
        this.boss.body.setCollideWorldBounds(true); // Asegúrate de que el jefe no salga de la pantalla

        // Definir las rutas como un array de puntos
        this.routes = [
            { x: 100, y: 300 },
            { x: 400, y: 300 },
            { x: 400, y: 100 },
            { x: 700, y: 100 },
            { x: 700, y: 300 },
            { x: 300, y: 300 },
            { x: 350, y: 250 },
            { x: 400, y: 200 },
            { x: 1000, y: 300 },
            { x: 1000, y: 100 },
            { x: 1200, y: 100 },
            { x: 200, y: 400 },
            { x: 600, y: 400 },
            { x: 600, y: 200 },
            { x: 900, y: 200 },
            { x: 900, y: 400 },
            { x: 1200, y: 400 },
            { x: 1200, y: 200 },
            { x: 1200, y: 200 },
            { x: 300, y: 500 },
            { x: 700, y: 500 },
            { x: 700, y: 300 },
            { x: 1000, y: 300 },
            { x: 1000, y: 500 },
            { x: 1300, y: 500 },
            { x: 1200, y: 400 },
            { x: 1200, y: 300 },
            { x: 400, y: 600 },
            { x: 800, y: 600 },
            { x: 800, y: 400 },
            { x: 1100, y: 400 },
            { x: 1100, y: 600 },
            { x: 1000, y: 600 },
            { x: 1200, y: 400 },
            { x: 1100, y: 400 },
            { x: 500, y: 700 },
            { x: 900, y: 700 },
            { x: 900, y: 500 },
            { x: 1200, y: 500 },
            { x: 1200, y: 700 },
            { x: 1200, y: 700 }
        ];

        this.currentRouteIndex = 0; // Índice de la ruta actual
        this.moveToNextPoint(); // Iniciar el movimiento
        this.bossIsMoving = true;
        // Iniciar el movimiento en un patrón
        this.time.addEvent({
            delay: 100, // Comprobar la posición cada 100 ms
            callback: this.checkForDirectionChange,
            callbackScope: this,
            loop: true
        });

        // Variable para rastrear si el jefe ha comenzado a moverse
        this.bossHasStartedMoving = false;

        // Iniciar el ataque solo después de que el jefe haya comenzado a moverse
        this.bossAttackEvent = this.time.addEvent({
            delay: 2000, // Intervalo de ataque (cada 2 segundos)
            callback: () => {
                if (this.bossAlive) { // Verificar si el jefe está vivo
                    this.bossAttack();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    moveToNextPoint() {
        const target = this.routes[this.currentRouteIndex];

        // Asegúrate de que el objetivo esté dentro de los límites de la pantalla
        if (target.x < 0) target.x = 100;
        if (target.x > 1500) target.x = 1400; // Limite derecho
        if (target.y < 50) target.y = 100;
        if (target.y > 700) target.y = 600; // Limite inferior

        // Mover al siguiente punto a la velocidad actual
        this.physics.moveTo(this.boss, target.x, target.y, this.bossMoveSpeed);

        // Marcar que el jefe ha comenzado a moverse
        this.bossHasStartedMoving = true;

        // Comprobar si el jefe ha llegado al punto objetivo
        this.boss.once('animationcomplete', () => {
            // Cambiar al siguiente punto
            this.currentRouteIndex++;

            // Si hemos llegado al final de las rutas, reiniciar
            if (this.currentRouteIndex >= this.routes.length) {
                this.currentRouteIndex = 0; // Reiniciar al inicio
            }

            this.moveToNextPoint(); // Mover al siguiente punto
        });
    }
    checkForDirectionChange() {
        const target = this.routes[this.currentRouteIndex];

        // Verificar si el jefe ha alcanzado las coordenadas específicas
        if (Phaser.Math.Distance.Between(this.boss.x, this.boss.y, target.x, target.y) < 10) {
            // Cambiar dirección al llegar a la coordenada
            this.currentRouteIndex = (this.currentRouteIndex + 1) % this.routes.length; // Cambiar al siguiente punto
            this.moveToNextPoint(); // Mover al siguiente punto
        }

        // Verificar si el jefe está cerca de los bordes de la pantalla
        if (this.boss.x <= 100 || this.boss.x >= 1400 || this.boss.y <= 50 || this.boss.y >= 650) {
            // Cambiar la dirección del jefe
            this.currentRouteIndex = (this.currentRouteIndex + 1) % this.routes.length; // Cambiar al siguiente punto
            this.moveToNextPoint(); // Mover al siguiente punto
        }
        if (this.boss.x > 1 && this.boss.x < 100) {
            this.moveToNextPoint(); // Mover al siguiente punto
        }

        
    }
    bossAttack() {
        // Lógica para que el jefe ataque la posición actual del jugador
        const attack = this.ataqueE.create(this.boss.x, this.boss.y, 'attackBoss');
        attack.setScale(0.1);
        attack.lifespan = 2000; // Duración del ataque

        // Calcular la dirección del ataque hacia la posición del jugador
        const directionX = this.playerPosition.x - this.boss.x;
        const directionY = this.playerPosition.y - this.boss.y;
        const angle = Math.atan2(directionY, directionX);

        // Establecer la velocidad del ataque
        attack.setVelocity(Math.cos(angle) * 300, Math.sin(angle) * 300); // Velocidad de ataque

        // Colisión entre el ataque del jefe y el jugador
        this.physics.add.collider(attack, this.player, this.hitPlayer, null, this);
    }

    hitPlayer(player, attack) {
        if (this.isInvincible){
            attack.destroy();
         return;
          }
            
        // Resta una vida al jugador
        this.lives--;
        
        console.log("Vidas restantes: ", this.lives);
        if (this.ImagenVida.length > 0) {
            const vidaImage = this.ImagenVida.pop(); // Eliminar la última imagen de vida
            vidaImage.destroy(); // Destruir la imagen de vida
        }

        // Destruir el ataque
        attack.destroy();

        // Verifica si el jugador ha perdido todas sus vidas
        if (this.lives > 0) {
            this.isInvincible = true; // Activar inmunidad
            // Definir el volumen original

            // Reproducir el sonido
            this.sonidoDano.play();

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
            this.sonidoDano.stop();
            this.musicafondo.stop();
            this.SonidoMuerte.play();
            this.gameOver = true;
            this.scoreText.setText('¡GAME OVER!');
            this.verificarYGuardarPuntuacion();
            this.jugador.puntos=this.puntospartida; // Actualizar la puntuación
            this.jugador.guardar();
            // Llamar al método para mostrar el mensaje de Game Over
            this.showGameOver();
        }
    }


    dash(direction) {
        this.isDashing = true; // Activar el estado de dash
        // Cambiar el color del jugador
        this.player.setTint(0x00ff00); // Cambiar a un color verde (puedes elegir otro)

        // Establecer la velocidad del jugador según la dirección
        if (direction === 'left') {
            this.player.setVelocityX(-this.dashSpeed);
        } else if (direction === 'right') {
            this.player.setVelocityX(this.dashSpeed);
        }


        // Desactivar el dash después de un corto período de tiempo
        this.time.delayedCall(500, () => {
            this.isDashing = false; // Desactivar el estado de dash
            this.player.clearTint(); // Limpiar el tinte del jugador
        });
    }
    createTrail() {
        let trailKey;

        // Determinar la animación del rastro según la dirección del movimiento
        if (this.cursors.left.isDown) {
            trailKey = this.personaje === 1 ? 'Nano_izquierda' : 'Shizuka_izquierda';
        } else if (this.cursors.right.isDown) {
            trailKey = this.personaje === 1 ? 'Nano_derecha' : 'Shizuka_derecha';
        }

        // Crear el rastro usando la animación correspondiente
        if (trailKey) {
            const trail = this.add.sprite(this.player.x, this.player.y, trailKey);
            trail.setScale(0.2); // Ajusta el tamaño del rastro
            trail.setTint(0x00ff00);
            trail.lifespan = 300; // Duración del rastro en milisegundos

            this.time.delayedCall(300, () => {
                trail.destroy();
            });
        }
    }


    updateTimer() {
        if (!this.isPaused) { // Solo actualizar si no está en pausa

            this.timeLeft--; // Decrementar el tiempo
            
            // Actualizar el texto del temporizador
            this.timerText.setText(`${this.timeLeft}`);
            
            // Actualizar el multiplicador de puntuación
            if (this.timeLeft === 50) {
                this.scoreMultiplier = 10;
            } else if (this.timeLeft === 40) {
            this.scoreMultiplier = 6;
        } else if (this.timeLeft === 20) {
            this.scoreMultiplier = 4;
        } else if (this.timeLeft === 10) {
            this.scoreMultiplier = 1.5;
        }
        
        // Actualizar el texto del multiplicador
            this.scoreMultiplierText.setText(`Multiplicador: x${this.scoreMultiplier}`);
        // Verificar si el tiempo ha llegado a 0
            if (this.timeLeft <= 0 && !this.gameOverTriggered) {
                this.timeLeft = 0; // Asegurarse de que no sea negativo
                this.gameOverTriggered = true; // Marcar que el Game Over ha sido activado
                this.showGameOver(); // Mostrar Game Over
            }
        }
    }


    updateScore() {
        this.puntospartida += 100 * this.scoreMultiplier; // Multiplicar por el multiplicador

        this.scoreText.setText('Score: ' + this.puntospartida); // Actualizar el texto de la puntuación
            // Guardar la puntuación en localStorage
        localStorage.setItem('puntuacionNivel1', this.puntospartida); // Guardar en localStorage
        this.jugador.puntos=this.puntospartida; // Actualizar la puntuación
        this.jugador.guardar();
        this.verificarYGuardarPuntuacion();
    }

    verificarYGuardarPuntuacion() {
        // Obtener el nombre del jugador desde localStorage
        const nombreJugador = localStorage.getItem('playerName'); // Obtener el nombre del jugador
    
        // Obtener los jugadores del localStorage
        let jugadores = JSON.parse(localStorage.getItem("jugadores")) || {};
    
        // Si el jugador ya existe
        if (jugadores[nombreJugador]) {
            // Comparar la puntuación acumulada con la puntuación del jugador
            if (this.puntospartida > jugadores[nombreJugador].puntos) {
                // Si la puntuación acumulada es mayor, actualizar
                console.log("ayuda, llamen a la policia");
                 this.jugador.puntos=this.puntospartida; // Actualizar la puntuación
                this.jugador.guardar();
            }
        } else {
            // Si el jugador no existe, crear uno nuevo
            jugadores[nombreJugador] = {
                nombre: nombreJugador,
                puntos: this.jugador.puntos // Asignar puntos iniciales
            };
        }
    
        // Guardar el objeto actualizado en localStorage
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
    }
    toggleMute() {
        this.isMuted = !this.isMuted; // Cambiar el estado de muteo
        if (this.isMuted) {
            this.setVolume(0); // Silenciar todos los sonidos
            // Cambiar el icono del botón a uno de "mute"
            document.getElementById('muteButton').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="40" height="40" stroke-width="2">
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                    <path d="M16 10l4 4m0 -4l-4 4"></path>
                </svg>
            `;
        } else {
            this.setVolume(0.5); // Restaurar el volumen original
            // Cambiar el icono del botón a uno de "unmute"
            document.getElementById('muteButton').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="40" height="40" stroke-width="2">
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                    <path d="M16 10l4 4m0 -4l-4 4"></path>
                </svg>
            `;
        }
    }


}