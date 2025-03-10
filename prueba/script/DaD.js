        const piezas = document.querySelectorAll('.piece');
        const zonas = document.querySelectorAll('.dropzone');
        let colocadas = 0;
        let tiempo = 30; // Tiempo inicial
        let score = parseInt(localStorage.getItem('score')) || 10; // Obtener la puntuación del localStorage o establecer 10 si no existe
    
        // Función para mezclar las piezas aleatoriamente
        function mezclarPiezas() {
            const piezasArray = Array.from(piezas);
            const piezasDesordenadas = piezasArray.sort(() => Math.random() - 0.5);
            const contenedorPiezas = document.querySelector('.pieces');
            piezasDesordenadas.forEach(pieza => {
                contenedorPiezas.appendChild(pieza); // Reorganizar las piezas
            });
        }
    
        // Llamar a la función para mezclar las piezas al cargar la página
        mezclarPiezas();
    
        piezas.forEach(pieza => {
            pieza.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('id', pieza.id);
            });
        });
    
        zonas.forEach(zona => {
            zona.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            zona.addEventListener('drop', (e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('id');
                const pieza = document.getElementById(id);
    
                if (zona.children.length === 0 && id === zona.dataset.id) {
                    zona.appendChild(pieza);
                    pieza.style.cursor = 'default';
                    pieza.draggable = false;
                    colocadas++;
                }
    
                if (colocadas === 9) {
                    document.getElementById('mensaje').textContent = '¡Rompecabezas completado!';
                    clearInterval(contadorInterval); // Detener el contador
    
                    // Calcular la bonificación de puntos según el tiempo restante
                    let multiplicador = 1;
                    if (tiempo > 20) {
                        multiplicador = 10;
                    } else if (tiempo > 10) {
                        multiplicador = 5;
                    } else {
                        multiplicador = 2;
                    }
    
                    // Aplicar multiplicador al score guardado en localStorage
                    score *= multiplicador;
                    localStorage.setItem('score', score); // Guardar la nueva puntuación en el localStorage
                    console.log('Nueva puntuación:', score); // Mostrar la nueva puntuación en la consola
                }
            });
        });
    
        // Contador
        const contadorElement = document.getElementById('contador');
        const mensajeTiempo = document.getElementById('mensajeTiempo');
        const contadorInterval = setInterval(() => {
            tiempo--;
            contadorElement.textContent = tiempo;
    
            // Mostrar mensajes según el tiempo restante
            if (tiempo === 29) {
                mensajeTiempo.textContent = 'Multiplicador: x10';
            } else if (tiempo === 20) {
                mensajeTiempo.textContent = 'Multiplicador: x5';
            } else if (tiempo === 10) {
                mensajeTiempo.textContent = 'Multiplicador: x2';
            } else if (tiempo === 0) {
                clearInterval(contadorInterval);
                document.getElementById('mensaje').textContent = '¡Tiempo agotado!';
                mensajeTiempo.style.display = 'none';
                contadorElement.style.display = 'none'; // Ocultar el temporizador
            }
        }, 1000);
    