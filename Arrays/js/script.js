let dades;
let pokeArray = [];
let sortOption;
let showChart = false;
let sortMessage = "";
let myChart;

let arrayLabels;
let arrayDadesGraf;
let backgroundColor = [];
let borderColor = [];

fetch("js/data/pokemon.json").then((response) => response.json()).then((data) => {
	dades = data.pokemon;
});

document.getElementById('txtSearch').addEventListener('input', (noLeasEsto) => { pokeFilter(document.getElementById('txtSearch').value); });

function rearrangePokeArray() {
	pokeArray = [];
	dades.forEach(item => {
		pokeArray.push({
			num: item.num,
			name: item.name,
			img: item.img,
			weight: item.weight,
			type: item.type
		})
	});
}

function pokeFilter(subName) {
	playText();
	checkForTableAndDelete();
	searchBarInteraction();
	if (subName != "") {
		var documentoTexto = document.getElementById("orderMessageDiv");
		documentoTexto.style.animation = "";
		documentoTexto.style.opacity = '0';
		deleteSetTimers();
		let customArray = [];
		dades.forEach(item => {
			if (item["name"].toLowerCase().includes(subName.toLowerCase())) customArray.push([item.num, item.name, item.img, item.weight, item.type]) 
		});
		changeSortMessage("skip", true);
		pokeArray = [];
		customArray.forEach(item => {pokeArray.push({	num: item[0], 
														name: item[1],
														img: item[2],
														weight: item[3],
														type: item[4]}); })
		if (pokeArray.length != dades.length) {
			printList(false, true);
		}
	}
}

function crearArrayLabels() {
	arrayLabels = [];
	arrayDadesGraf = [];
	pokeArray.forEach(item => {
		item.type.forEach(type => {
			if (!arrayLabels.includes(type)) {
				arrayLabels.push(type);
				arrayDadesGraf.push(0);
			}
		})
	});
	for (let i = 0; i < arrayLabels.length; i++) {
		for (let j = 0; j < pokeArray.length; j++) {
			for (let z = 0; z < 2; z++) {
				if (pokeArray[j].type[z] == arrayLabels[i]) {
					arrayDadesGraf[i] += 1;
				}
			}
		}
	}
}

function crearChart() {
	crearArrayLabels();
	arrayLabels.forEach(item => {
		let randomColor1 = Math.random()*256;
		let randomColor2 = Math.random()*256;
		let randomColor3 = Math.random()*256;
		backgroundColor.push('rgba(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ', 0.45)');
		borderColor.push('rgb(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ')');
	});

	const pokeDatos = {
		labels: arrayLabels,
		datasets:[{
					label: 'Test',
					data: arrayDadesGraf,
					backgroundColor: backgroundColor,
					borderColor: borderColor,
				}]
	};
	if (myChart) myChart.destroy();
	myChart = new Chart(
		document.getElementById('myChart'),
		{type: 'polarArea', data: pokeDatos, options: {plugins: {legend: {labels: {font:{size: 15}}}}}}
	);
}

function printChart(option) {

	if (pokeArray.length != 0) {
		crearChart();
		deleteSetTimers();
		if (option != 'nohide') {
			searchBarInteraction('hide');
		} 
		if (option != 'nosound') {
			playOpenMenu();
		}
		showPromptMessage("", "chartDiv", "myChart");
	} else showPromptMessage("No hay Pokémon en la tabla.", "promptMessage", "innerPromptMessage");
}

function hideChart(option) {
	if (showChart) printChart(option);
}

function printList(resetTable, opcionPrintSortMessage) {
	sortOption = "";
	if (resetTable) {
		rearrangePokeArray();
		searchBarInteraction('hide');
	}
	sortTable('num', opcionPrintSortMessage);
}

function sortTable(respuesta, opcionPrintSortMessage, elemento) {
	playConfirmSound();
	checkForTableAndDelete();
	var tabla = document.createElement("table");
	secuenciaPrintList(-1, tabla);
	if (sortOption == respuesta) {
		pokeArray.reverse();
	} else {
		switch (respuesta) {
			case 'num':
				sortPokeArrayByNum();
				break;
			case 'nam':
				sortPokeArrayByName();
				break;
			case 'wgt':
				sortPokeArrayByWeight();
				break;
		}
	}
	var oldSort = sortOption;
	sortOption = respuesta;
	changeSortMessage(oldSort, opcionPrintSortMessage);
	pokeArray.forEach(item => {secuenciaPrintList(item, tabla)});
	document.getElementById("resultat").appendChild(tabla);
}

function changeSortMessage(option, stopPrint) {
	var documento = document.getElementById("orderMessage");
	var innerItalicText = document.createElement("pre");
	var coloredInnerItalicText = document.createElement("pre");
	documento.innerHTML = "Tabla ordenada por ";
	innerItalicText.style.fontStyle = "cursive";
	if (option != 'skip') {
		var detectState = sortMessage.split(" ");
		switch (sortOption) {
			case 'num':
				innerItalicText.innerHTML = 'número ';
				break;
			case 'nam':
				innerItalicText.innerHTML = 'nombre ';
				break;
			case 'wgt':
				innerItalicText.innerHTML = 'peso ';
				break;
		}
		if (option == sortOption) {
			coloredInnerItalicText.innerHTML = (detectState[4] == 'ascendente' ? 'descendente' : 'ascendente');
		} else {
			coloredInnerItalicText.innerHTML = 'ascendente';
		} 
	} else {
		innerItalicText.innerHTML = 'número';
		coloredInnerItalicText.innerHTML = 'ascendente';
		stopPrint = true;
	}
	coloredInnerItalicText.style.color = (coloredInnerItalicText.innerHTML == 'ascendente') ? "green" : "red";
	innerItalicText.appendChild(coloredInnerItalicText);
	documento.appendChild(innerItalicText);
	sortMessage = documento.textContent;
	if (!stopPrint) {
		deleteSetTimers();
		animateSortMessage();
	}
}

function animateSortMessage() {
	var documentoTexto = document.getElementById("orderMessageDiv");
	documentoTexto.style.animation = "";
	documentoTexto.style.opacity = '0';
	deleteSetTimers();
	documentoTexto.style.animation = "smoothOpacity 0.35s forwards";
	setTimeout(function () {
		documentoTexto.style.opacity = "1";
		documentoTexto.style.animation = "";
	}, 350);
	setTimeout(function () {
		documentoTexto.style.opacity = "0";
		documentoTexto.style.animation = "smoothOpacity 0.35s";
		documentoTexto.style.animationDirection = "reverse";
	}, 1300);
	setTimeout(function() {
		documentoTexto.style.animation = "";
	}, 1650);
}

function deleteSetTimers() {
	var borrarTimeouts = window.setTimeout(function() {}, 0);
	while (borrarTimeouts--) {
		window.clearTimeout(borrarTimeouts);
	}
}

function animationWipe(documento, clearOpacity) {
	documento.style.animation = "";
	if (clearOpacity) documento.style.opacity = '0';
}

function sortPokeArrayByNum() {
	pokeArray.sort(function(a,b) {
		return a.num > b.num ? 1 : -1;
	});
}

function sortPokeArrayByName() {
	pokeArray.sort(function(a,b) {
		return a.name > b.name ? 1 : -1;
	});
}

function sortPokeArrayByWeight() {
	pokeArray.sort(function(a,b) {
		return parseFloat(a.weight) - parseFloat(b.weight);
	});
}

function secuenciaPrintList(elemento, tabla) {
	var nuevaLinea = tabla.insertRow();
	var celdaNum = nuevaLinea.insertCell();
	var celdaName = nuevaLinea.insertCell();
	var celdaImg = nuevaLinea.insertCell();
	var celdaWeight = nuevaLinea.insertCell();

	var pokeNum = document.createElement("pre");
	var pokeName = document.createElement("pre"); 	
	var pokeImg = document.createElement("img");
	var pokeWeight = document.createElement("pre");

	if (elemento == -1) {
		pokeNum.innerHTML = "Núm. Pokédex";
		pokeName.innerHTML = "Nom. Pokémon";
		pokeImg = document.createElement("pre");
		pokeImg.innerHTML = "Img. Pokémon";
		pokeWeight.innerHTML = "Peso Pokémon";
		celdaNum.style = celdaName.style = celdaImg.style = celdaWeight.style = 'filter: invert(15%);'
		celdaNum.onclick = function() {sortTable('num', false, elemento)};
		celdaName.onclick = function() {sortTable('nam', false, elemento)};
		celdaWeight.onclick = function() {sortTable('wgt', false, elemento)};
	} else {
		pokeNum.innerHTML = elemento.num;
		pokeName.innerHTML = elemento.name;
		pokeImg.src = elemento.img;
		pokeWeight.innerHTML = elemento.weight;
	}

	celdaNum.appendChild(pokeNum);
	celdaName.appendChild(pokeName);
	celdaImg.appendChild(pokeImg);
	celdaWeight.appendChild(pokeWeight);
}

function searchBarInteraction(option) {
	var elemento = document.getElementById("txtSearch");
	if (option == 'hide') {
		if (elemento.style.width == '55vh') {
			elemento.style.animation = "expandirBoton 0.1s forwards ease-in";
			elemento.style.animationDirection = "reverse";
			elemento.onclick = function() { searchBarInteraction(); };
			setTimeout(function() {
				elemento.style.width = "";
				elemento.style.animation = "";
			}, 150);
		}
	} else if (elemento.style.width == '') {
		playOpenMenu();
		elemento.style.animation = "expandirBoton 0.1s forwards ease-in";
		elemento.onclick = "";
		setTimeout(function() {
			elemento.style.width = "55vh";
			elemento.style.animation = "";
		}, 150)
	}
}

function calcMitjana() {
	let sumaTotal = 0;
	if (pokeArray.length != 0) {
		pokeArray.forEach(item => { sumaTotal += parseFloat(item.weight)});
		showPromptMessage("La media de peso actual es de " + (sumaTotal/pokeArray.length).toFixed(2) + "kg.", "promptMessage", "innerPromptMessage");
	} else {
		showPromptMessage("No hay Pokémon en la tabla.", "promptMessage", "innerPromptMessage");
	}
}

function showPromptMessage(texto, stringElemento, stringElementoTexto) {
	playOpenMenu();
	let elemento = document.getElementById(stringElemento);
	let elementoTexto = document.getElementById(stringElementoTexto);

	elemento.style.transform = "scale(1)";
	elemento.style.animation = "smoothOpacity 0.15s forwards";
	elementoTexto.style.animation = "fullExpand 0.3s forwards";
	elementoTexto.style.animationDelay = "0.15s";
	elementoTexto.innerHTML = texto;
	setTimeout(function() {
		elemento.style.opacity = "1";
		elementoTexto.style.transform = "scale(1)";
		elemento.style.animation = "";
		elementoTexto.style.animation = "";
		elementoTexto.onclick = function() { hidePromptMessage(stringElemento, stringElementoTexto) };
	}, 450);
}

function hidePromptMessage(stringElemento, stringElementoTexto) {
	playConfirmSound();
	let elemento = document.getElementById(stringElemento);
	let elementoTexto = document.getElementById(stringElementoTexto);
	elementoTexto.onclick = "";

	elementoTexto.style.animation = "fullExpand 0.3s forwards";
	elementoTexto.style.animationDirection = "reverse";
	elemento.style.animation = "smoothOpacity 0.15s forwards";
	elemento.style.animationDirection = "reverse";
	elemento.style.animationDelay = "0.3s";
	setTimeout(function() {
		elemento.style.transform = "scale(0)";
		elementoTexto.style.transform = "scale(0)";
		elemento.style.animation = "";
		elementoTexto.style.animation = "";
	}, 450);
}

function checkForTableAndDelete() {
	if (document.getElementById('resultat').firstChild) {
		document.getElementById('resultat').firstChild.remove();
	}
}

function refreshPage() {
	window.location.reload();
}

function playConfirmSound() {
	resetSound("confirmSound");
	document.getElementById("confirmSound").play();
}

function playOpenMenu() {
	resetSound("openMenu");
	document.getElementById("openMenu").play();
}

function playText() {
	resetSound("textSound");
	document.getElementById("textSound").play();
}

function resetSound(r) {
	document.getElementById(r).currentTime = 0;
}