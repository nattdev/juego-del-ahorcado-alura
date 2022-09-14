let listaPalabras = ["primera", "segunda", "tercera", "cuarta"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");

let boxPalabraOculta = document.querySelector(".palabra-oculta");
let boxLetrasEncontradas = document.querySelector(".letras-encontradas");

let palabraSecreta = "";
let keyValue = "";

let diccionario = "abcdefgjhijklmnñopqrstuvwxyz";

function dibujarLetraIncorrecta() {
	let letraIncorrecta = document.createElement("div");
	letraIncorrecta.innerText = keyValue;
	boxLetrasEncontradas.appendChild(letraIncorrecta);
}

function dibujarLetra() {
	if(palabraSecreta.includes(keyValue)){
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
	
}

function capturarTecla() {
	document.addEventListener("keydown", (e) => {
		keyValue = e.key;
		dibujarLetra();
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
