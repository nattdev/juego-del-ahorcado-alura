let listaPalabras = ["SANDIA", "UVA", "PERA", "MANGO", "KIWI", "PLATANO", "FRESA"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");
let btnDesistir = document.querySelector("#btn-desistir");
let btnNuevoJuego = document.querySelector("#btn-nuevo-juego");
let btnGuardarPalabra = document.querySelector("#btn-guardar-palabra");
let btnCancelar =  document.querySelector("#btn-cancelar");


let boxDibujo = document.querySelector(".dibujar img");
let boxMessages = document.querySelector(".dibujar .messages")

let boxAgregarPalabra = document.querySelector(".pantalla-agregar-palabra textarea");
let boxPalabraOculta = document.querySelector(".palabra-oculta");
let boxLetrasEncontradas = document.querySelector(".letras-encontradas");
let boxTecladoMobile = document.querySelector(".teclado-mobile");

let pantallaMenu = document.querySelector(".pantalla-menu");
let pantallaIniciarJuego = document.querySelector(".pantalla-iniciar-juego");
let pantallaAgregarPalabra = document.querySelector(".pantalla-agregar-palabra");

let palabraSecreta = "none";
let keyValue = "";
let intento = 0;
let onOff = 0;

let diccionario = "abcdefgjhijklmnñopqrstuvwxyz";
let diccionarioUpperCase = "ABCDEFGJHIJKLMNÑOPQRSTUVWXYZ";

function crearTecladoVirtual() {
	for(let i = 0; i < diccionarioUpperCase.length; i++) {
		let boxLetra = document.createElement("div");
		boxLetra.innerText = diccionarioUpperCase[i];
		boxTecladoMobile.appendChild(boxLetra);
	}	
}

function crearEventosTeclado() {
	for(let i = 0; i < boxTecladoMobile.childNodes.length; i++) {
		console.log("for");
		boxTecladoMobile.childNodes[i].addEventListener("click", (e) => {
			keyValue = e.target.innerText;
			verificarFinJuego();
		});
	}
}

function mostrarPantallaMenu() {
	pantallaMenu.style.display = "flex";
	pantallaIniciarJuego.style.display = "none";
	pantallaAgregarPalabra.style.display = "none";
	boxAgregarPalabra.value = "";
}

function mostrarPantallaAgregarPalabra() {
	pantallaMenu.style.display = "none";
	pantallaAgregarPalabra.style.display = "flex";
}

function mostrarPantallaIniciarJuego() {
	pantallaMenu.style.display = "none";
	pantallaIniciarJuego.style.display = "flex";
	pantallaAgregarPalabra.style.display = "none";
}

function messageGanador() {
	boxMessages.classList.add("win-msg");
	boxMessages.classList.remove("loser-msg");
	boxMessages.innerText = "FELICIDADES GANASTE!";
}

function verificarGanador() {
	console.log(boxPalabraOculta.textContent == palabraSecreta);
	return boxPalabraOculta.textContent == palabraSecreta;
}

function messageFinJuego() {
	boxMessages.classList.add("loser-msg");
	boxMessages.classList.remove("win-msg");
	boxMessages.innerText = "PERDISTE :(";
}

function logicaJuego() {
	if(palabraSecreta.includes(keyValue)){
		dibujarLetra();
	} else {
		if (!boxLetrasEncontradas.textContent.includes(keyValue)) {
			dibujarLetraIncorrecta();
			dibujarIntentosFallidos(intento);
			intento++;
		} 
	}
	console.log(intento);
}


function verificarFinJuego() {
	if(verificarTecla()){
		if(intento < 7 && !verificarGanador()) {
		logicaJuego();
		}
		if(verificarGanador()) {
		messageGanador();
		}
		if(intento >= 7){
		messageFinJuego();	
		}
	} else {
		console.log("Letra no valida");
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


function capturarEventoTecla(e){
	onOff = 1;
	keyValue = e.key.toUpperCase();
	console.log(keyValue);
	verificarFinJuego();
}

function capturarTecla() {
	if(onOff == 0 ){
		document.addEventListener("keydown", capturarEventoTecla);
	}
}

function verificarTecla() {
	return (diccionario.includes(keyValue) || diccionarioUpperCase.includes(keyValue));
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

function guardarPalabra(palabra) {
	if (palabra !== "") {
		listaPalabras.push(palabra);
	}

}

function guardarEmpezarPalabra () {
	guardarPalabra(boxAgregarPalabra.value.toUpperCase());
	boxAgregarPalabra.value = "";
	iniciarJuego();
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
	boxDibujo.src = "images/base.svg";
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

crearTecladoVirtual();
crearEventosTeclado();

btnNuevoJuego.addEventListener("click", iniciarJuego);
btnIniciarJuego.addEventListener("click", iniciarJuego);
btnAgregarPalabra.addEventListener("click", mostrarPantallaAgregarPalabra);
btnDesistir.addEventListener("click", mostrarPantallaMenu);
btnGuardarPalabra.addEventListener("click", guardarEmpezarPalabra);
btnCancelar.addEventListener("click", mostrarPantallaMenu);
