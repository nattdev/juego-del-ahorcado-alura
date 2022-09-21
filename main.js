let listaPalabras = ["primera", "segunda", "tercera", "cuarta"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");
let btnDesistir = document.querySelector("#btn-desistir");
let btnNuevoJuego = document.querySelector("#btn-nuevo-juego");

let boxDibujo = document.querySelector(".dibujar img");
let boxMessages = document.querySelector(".dibujar .messages")

let boxPalabraOculta = document.querySelector(".palabra-oculta");
let boxLetrasEncontradas = document.querySelector(".letras-encontradas");

let pantallaMenu = document.querySelector(".pantalla-menu");
let pantallaIniciarJuego = document.querySelector(".pantalla-iniciar-juego");
let pantallaAgregarPalabra = document.querySelector(".pantalla-agregar-palabra");

let palabraSecreta = "none";
let keyValue = "";
let intento = 0;

let diccionario = "abcdefgjhijklmnñopqrstuvwxyz";

function mostrarPantallaMenu() {
	pantallaMenu.style.display = "flex";
	pantallaIniciarJuego.style.display = "none";
}

function mostrarPantallaAgregarPalabra() {
	pantallaMenu.style.display = "none";
	pantallaAgregarPalabra.style.display = "unset";
}

function mostrarPantallaIniciarJuego() {
	pantallaMenu.style.display = "none";
	pantallaIniciarJuego.style.display = "unset";
}

function messageGanador() {
	boxMessages.innerText = "FELICIDADES GANASTE!";
}

function verificarGanador() {
	console.log(boxPalabraOculta.textContent == palabraSecreta);
	return boxPalabraOculta.textContent == palabraSecreta;
}

function messageFinJuego() {
	boxMessages.innerText = "PERDISTE :(";
}

function verificarFinJuego() {
	if(intento < 7){
			if(palabraSecreta.includes(keyValue)){
				dibujarLetra();
			} else {
				if (!boxLetrasEncontradas.textContent.includes(keyValue)) {
					dibujarLetraIncorrecta();
					dibujarIntentosFallidos(intento);
					intento++;
					console.log(intento);
				} 
			}	
	}
	if(!verificarGanador()){
		if(intento >= 7) {
		messageFinJuego();	
		}	
	} else {
		messageGanador();
	}

	
}

function dibujarIntentosFallidos(intento) {
	let partesDibujo = ["images/horca.svg", "images/cabeza.svg", "images/tronco.svg","images/pierna-izq.svg", "images/pierna-der.svg", "images/brazo-izq.svg", "images/brazo-der.svg"];
	boxDibujo.src = partesDibujo[intento];
}

function dibujarLetraIncorrecta() {
	let letraIncorrecta = document.createElement("div");
	letraIncorrecta.innerText = keyValue;
	boxLetrasEncontradas.appendChild(letraIncorrecta);
}

function dibujarLetra() {
		let indices = [];
		let idx = palabraSecreta.indexOf(keyValue);
		while (idx != -1) {
			indices.push(idx);
			idx = palabraSecreta.indexOf(keyValue, idx + 1);
		}
		console.log(indices);
		for (let i of indices ){
			boxPalabraOculta.children[i].innerText = keyValue;
		}
}

function capturarTecla() {
	document.addEventListener("keydown", (e) => {
		keyValue = e.key;
		console.log(keyValue);
		if(verificarTecla()){
			verificarFinJuego();	
		} else {
			console.log("Letra no valida");
		}

	});
}

function verificarTecla() {
	return (diccionario.includes(keyValue));
}

function crearLineasPalabra() {
	for(let i = 0; i < palabraSecreta.length; i++){
		let espacioLetra = document.createElement("div");
		boxPalabraOculta.appendChild(espacioLetra);		
	}
}

function escogerPalabra() {
	palabraSecreta = aleatorizarPalabra(listaPalabras);
	console.log(palabraSecreta);
}

function agregarPalabra(palabra) {
	listaPalabras.push(palabra);
}

function aleatorizarPalabra(listaPalabras) {
	console.log("hello");
	return listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
}

function limpiarPalabra() {
	while(boxPalabraOculta.hasChildNodes()) {
		boxPalabraOculta.removeChild(boxPalabraOculta.firstChild);
	}
	intento = 0;
}

function limpiarLetrasEncontradas() {
	while(boxLetrasEncontradas.hasChildNodes()) {
		boxLetrasEncontradas.removeChild(boxLetrasEncontradas.firstChild);
	}
}

function limpiarDibujarImagen() {
	boxDibujo.src = "";
}

function limpiarMessages() {
	boxMessages.innerText = "";
}

function limpiarPantallaJuego() {
	limpiarPalabra();
	limpiarLetrasEncontradas();
	limpiarDibujarImagen();
	limpiarMessages();
}

function iniciarJuego(){	
	mostrarPantallaIniciarJuego();
	limpiarPantallaJuego();
	escogerPalabra();
	crearLineasPalabra();
	capturarTecla();
}

btnNuevoJuego.addEventListener("click", iniciarJuego);
btnIniciarJuego.addEventListener("click", iniciarJuego);
btnAgregarPalabra.addEventListener("click", mostrarPantallaAgregarPalabra);
btnDesistir.addEventListener("click", mostrarPantallaMenu);
