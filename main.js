let listaPalabras = ["primera", "segunda", "tercera", "cuarta"];

let btnIniciarJuego = document.querySelector("#btn-iniciar-juego");
let btnAgregarPalabra = document.querySelector("#btn-agregar-palabra");

let boxDibujo = document.querySelector(".dibujar img");
let boxPalabraOculta = document.querySelector(".palabra-oculta");
let boxLetrasEncontradas = document.querySelector(".letras-encontradas");


let palabraSecreta = "";
let keyValue = "";
let intento = 0;

let diccionario = "abcdefgjhijklmnñopqrstuvwxyz";


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
			if(palabraSecreta.includes(keyValue)){
				dibujarLetra();
			} else {
				if (!boxLetrasEncontradas.textContent.includes(keyValue)) {
					dibujarLetraIncorrecta();
				}
			}
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
}

function iniciarJuego(){	
	limpiarPalabra();
	escogerPalabra();
	crearLineasPalabra();
	capturarTecla();
}


btnIniciarJuego.addEventListener("click", iniciarJuego);
