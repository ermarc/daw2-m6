let dades;
let pokeArray;
let sortOption;
let showChart = false;

let arrayLabels = [];
let arrayDadesGraf = [];
let backgroundColor = [];
let borderColor = [];

fetch("js/data/pokemon.json").then((response) => response.json()).then((data) => {
	dades = data.pokemon;
	crearArrayLabels();
	crearDadesGrafs();
	crearChart();
	pokeArray = [];
});

document.getElementById('txtSearch').addEventListener('input', (noLeasEsto) => { pokeFilter(document.getElementById('txtSearch').value); });

function rearrangePokeArray() {
	pokeArray = [];
	dades.forEach(item => {pokeArray.push([item.num, item.name, item.img, item.weight, item.type])});
}

function pokeFilter(subName) {
	playText();
	checkForTableAndDelete();
	searchBarInteraction();
	if (subName != "") {
		let customArray = [];
		dades.forEach(item => {
			if (item["name"].toLowerCase().includes(subName.toLowerCase())) customArray.push([item.num, item.name, item.img, item.weight, item.type]) 
		});
		pokeArray = [];
		customArray.forEach(item => {pokeArray.push([item[0], item[1], item[2], item[3], item[4]]); })
		if (pokeArray.length != dades.length) {
			printList();
		}
	}
}

function crearDadesGrafs() {
	for (let i = 0; i < arrayLabels.length; i++) {
		arrayDadesGraf.push(0);
	}
	for (let i = 0; i < arrayLabels.length; i++) {
		for (let j = 0; j < pokeArray.length; j++) {
			for (let z = 0; z < 2; z++) {
				if (pokeArray[j][4][z] == arrayLabels[i]) {
					arrayDadesGraf[i] += 1;
				}
			}
		}
	}
}

function crearArrayLabels() {
	rearrangePokeArray();
	for (let i = 0; i < pokeArray.length; i++) {
		for (let j = 0; j < 2; j++) {
			if (!arrayLabels.includes(pokeArray[i][4][j]) && pokeArray[i][4][j] != undefined) {
				arrayLabels.push(pokeArray[i][4][j]);
			}
		}
	}
}

function crearChart() {
	for (let i = 0; i < arrayLabels.length; i++) {
		let randomColor1 = Math.random()*256;
		let randomColor2 = Math.random()*256;
		let randomColor3 = Math.random()*256;
		backgroundColor[i] = 'rgba(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ', 0.65)';
		borderColor[i] = 'rgb(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ')';
	}

	const pokeDatos = {
		labels: arrayLabels,
		datasets:[{
					label: 'Test',
					data: arrayDadesGraf,
					backgroundColor: backgroundColor,
					borderColor: borderColor,
				}]
	};
	
	const myChart = new Chart(
		document.getElementById('myChart'),
		{type: 'polarArea', data: pokeDatos, options: {}}
	);
}

function printChart(option) {
	if (option != 'nohide') {
		searchBarInteraction('hide');
	} 
	if (option != 'nosound') {
		playConfirmSound();
	}
	checkForTableAndDelete();

	var showChartButton = document.getElementById("showChartButton");
	showChartButton.disabled = true;
	let message;

	var getChart = document.getElementById("chartCSS");
	getChart.remove();

	var restoreChart = document.createElement("link");
	restoreChart.rel = "stylesheet";
	restoreChart.type = "text/css";
	restoreChart.id = "chartCSS";

	if (!showChart) {
		restoreChart.href = "recursos/css/show-Chart.css";
		message = "Esconder estadísticas";
	} else {
		restoreChart.href = "recursos/css/hide-Chart.css";
		message = "Mostrar estadísticas";
	}
	showChart = !showChart;

	document.getElementById("showChartButton").innerHTML = message;
	document.head.appendChild(restoreChart);
	showChartButton.disabled = false;
}

function hideChart(option) {
	if (showChart) printChart(option);
}

function printList(resetTable) {
	sortOption = "";
	if (resetTable) {
		rearrangePokeArray();
		searchBarInteraction('hide');
	}
	sortTable('num');
}

function sortTable(respuesta, elemento) {
	playConfirmSound();
	checkForTableAndDelete();
	hideChart('nohide');
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
	sortOption = respuesta;
	pokeArray.forEach(item => {secuenciaPrintList(item, tabla)});
	document.getElementById("resultat").appendChild(tabla);
}

function sortPokeArrayByNum() {
	pokeArray.sort();
}

function sortPokeArrayByName() {
	pokeArray.sort(function(a,b) {
		return a[1] > b[1];
	});
}

function sortPokeArrayByWeight() {
	pokeArray.sort(function(a,b) {
		return parseFloat(a[3]) > parseFloat(b[3]);
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
		celdaNum.onclick = function() {sortTable('num', elemento)};
		celdaName.onclick = function() {sortTable('nam', elemento)};
		celdaWeight.onclick = function() {sortTable('wgt', elemento)};
	} else {
		pokeNum.innerHTML = elemento[0];
		pokeName.innerHTML = elemento[1];
		pokeImg.src = elemento[2];
		pokeWeight.innerHTML = elemento[3];
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
		for (let i = 0; i < pokeArray.length; i++) {
			sumaTotal += parseFloat(pokeArray[i][3]);
		}
		showPromptMessage("La media de peso actual es de " + (sumaTotal/pokeArray.length).toFixed(2) + "kg.");
	} else {
		showPromptMessage("No hay Pokémon en la tabla.");
	}
}

function showPromptMessage(texto) {
	hideChart('nosound');
	playOpenMenu();
	let elemento = document.getElementById("promptMessage");
	let elementoTexto = document.getElementById("innerPromptMessage");

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
		elementoTexto.onclick = function() { hidePromptMessage() };
	}, 450);
}

function hidePromptMessage() {
	playConfirmSound();
	let elemento = document.getElementById("promptMessage");
	let elementoTexto = document.getElementById("innerPromptMessage");
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