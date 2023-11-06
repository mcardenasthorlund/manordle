class Wordle {
    idActual = 0;
    filaActual = 0;
    palabraSecreta = '';
    partidaTerminada = false;
    palabras = [
        'CHULA',
        'LIBRO',
        'MENTE',
        'DOGMA',
        'GOLPE',
        'CABAL',
        'PILLO',
        'PESCA',
        'CABRA',
        'PANCA',
        'PINTA',
        'BOLSA',
        'MANGO',
        'PERRO',
        'GATOS',
        'MORAL',
        'JABON',
        'HUEVO',
        'CERDO',
        'LECHE',
        'SALSA',
        'TORTA',
        'PASTA',
        'CALLE',
        'MUNDO',
        'JUEGO',
        'TARRO',
        'BANCO',
        'MADRE'
    ];

    constructor() {

        document.getElementById('btnComenzar').addEventListener('click', () => {
            document.getElementById('div-inicial').style.display = 'none';
            document.getElementById('div-juego').style.display = 'block';
        });

        document.getElementById('btnNuevoJuego').addEventListener('click', () => {
            this.inicializar();
        });
    }

    inicializar() {
        document.getElementById('palabras').innerHTML = '';
        for (let i = 0; i < 25; i++) {
            document.getElementById('palabras').innerHTML += `<div id='${i}' class="letra"></div>`;
        }

        this.idActual = 0;
        this.filaActual = 0;
        this.partidaTerminada = false;
        document.getElementById('btnNuevoJuego').style.display = 'none';
        document.getElementById('solucion').innerHTML = '';
        document.getElementById('solucion').display = 'none';

        this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];

        document.querySelectorAll('.letra').forEach(letra => {
            letra.innerHTML = '';
            letra.classList.remove('seleccionada');
        })

        console.log(this.palabraSecreta);
        this.seleccionarLetra();
    }

    seleccionarLetra() {
        document.querySelectorAll('.letra').forEach(letra => {
            letra.classList.remove('seleccionada');
        })
        document.getElementById(this.idActual).classList.add('seleccionada');
    }

    pulsarTecla(letra) {
        if (this.partidaTerminada) {
            return;
        }

        if (this.idActual >= (this.filaActual * 5 + 5)) {
            return;
        }

        document.getElementById(this.idActual).innerHTML = letra;
        this.idActual++;
        this.seleccionarLetra();
    }

    borrar() {
        if (this.partidaTerminada) {
            return;
        }
        // Comprobamos que no estemos al principio
        if (this.idActual == 0) {
            return;
        }

        // Comprobamos que no nos pasemos de la fila actual
        if (this.idActual == (this.filaActual * 5)) {
            return;
        }

        this.idActual--;
        document.getElementById(this.idActual).innerHTML = '';
        this.seleccionarLetra();
    }

    procesar() {
        // Chequeamos las letras
        let palabraIndicada = '';
        for (var i = 0; i < 5; i++) {
            palabraIndicada += document.getElementById(this.filaActual * 5 + i).innerHTML.toUpperCase();
            if (this.palabraSecreta[i] == document.getElementById(this.filaActual * 5 + i).innerHTML.toUpperCase()) {
                document.getElementById(this.filaActual * 5 + i).classList.add('correcta');
            }
            else if (this.palabraSecreta.includes(document.getElementById(this.filaActual * 5 + i).innerHTML.toUpperCase())) {
                document.getElementById(this.filaActual * 5 + i).classList.add('incorrecta');
            }
        }

        // Comprobamos si hemos encontrado la palabra
        if (this.palabraSecreta == palabraIndicada) {
            // Hemos encontrado la palabra
            this.partidaTerminada = true;
        }
        // Pasamos de fila
        this.filaActual++;
        if (this.filaActual >= 5) {
            // Has perdido
            this.partidaTerminada = true;
            document.getElementById('solucion').innerHTML = this.palabraSecreta;
            document.getElementById('solucion').style.display = 'block';
        }

        if (this.partidaTerminada) {
            document.getElementById('btnNuevoJuego').style.display = 'inline';
        }
    }

}