let listaPalabras = ["primera", "segunda", "tercera", "cuarta"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");

let boxPalabraOculta = document.querySelector(".palabra-oculta");

let palabraSecreta = "";
let keyValue = "";

let diccionario = "abcdefgjhijklmnñopqrstuvwxyz";

function capturarTecla() {
	document.addEventListener("keydown", (e) => {
		keyValue = e.key;
		console.log(keyValue);
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
}

function iniciarJuego(){	
	limpiarPalabra();
	capturarTecla();
	escogerPalabra();
	crearLineasPalabra();
}


btnIniciarJuego.addEventListener("click", iniciarJuego);
