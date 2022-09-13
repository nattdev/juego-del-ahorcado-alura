let listaPalabras = ["primera", "segunda", "tercera", "cuarta"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");

let palabraSecreta = "";

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

btnIniciarJuego.addEventListener("click", escogerPalabra);
