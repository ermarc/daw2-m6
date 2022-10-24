let locationArray = [];
let cuenta = 10;

fetch("recursos/municipis.json").then((response) => response.json()).then((data) => {
	locationData = data.elements;
    createEasyLocationArray(locationData);
});

function createEasyLocationArray(locationData) {
    locationData.forEach(item => { locationArray.push({name: item.municipi_nom, altitude: item.altitud, extension: item.extensio, population: item.nombre_habitants, mainPos: item.centre_municipal, comarca: item.grup_comarca.comarca_nom, img: item.municipi_escut}) });
}

function createLocationTable(locationArray) {
    var locationTable = document.createElement("table");
    locationArray.forEach(item => { generateLocationTableElement(item, locationTable); })
    document.body.appendChild(locationTable);
}

function generateLocationTableElement(item, masterTable) {
    var newTableRow = masterTable.insertRow();
    
    var tableElements = [];
    for (let i = 0; i < 4; i++) {
        tableElements.push(newTableRow.insertCell());
    }
    
    tableElements[0].innerHTML = item.name;
    tableElements[1].innerHTML = item.altitude;
    tableElements[2].innerHTML = item.extension;
    tableElements[3].innerHTML = item.population;
}

function switchTable() {
    if (document.getElementsByTagName("table")[0]) {
        document.getElementsByTagName("table")[0].remove();
    } else {
        createLocationTable(locationArray);
    }
}

function createLocationMap() {
    if (document.getElementById("mainScreen")) document.getElementById("mainScreen").remove();

    var locationMap = L.map('locationMapDiv', {
        center: [41.78879, 2.15899],
        zoom: 9,
        zoomControl: true
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(locationMap);

    var markerClusterGroup = L.markerClusterGroup({maxClusterRadius: 80});

    locationArray.forEach(item => {
        var lastItem = item.mainPos.split(',');
        lastMarker = L.marker([lastItem[0], lastItem[1]], {icon: selectPointerColor(item)});
        lastMarker.bindPopup(   "¡Feliz día, compatriota!<br>" +
                                "¡Esperamos que disfrutes de <br>tu estancia en <b> " + item.name + "</b>!" +
                                "<br><img src='" + item.img + "'>"  +
                                "<br><b>Comarca: </b>" + item.comarca + 
                                "<br><b>Número de habitantes: </b>" + item.population +
                                "<br><b>Extensión: </b>" + item.extension +
                                "<br><b>Altitud: </b>" + item.altitude).openPopup();
        markerClusterGroup.addLayer(lastMarker);
    });
    locationMap.addLayer(markerClusterGroup);
}

function selectPointerColor(item) {
    var customIcon = L.icon({
        iconUrl: '',
        shadowUrl: 'recursos/img/pointerS.png',
        iconSize: [30.765306, 45],
        iconAnchor: [0, 0],
        shadowSize: [40],
        shadowAnchor: [-15, -32],
        popupAnchor: [45, 2]
    });
    let value = parseInt(item.population);
    switch (true) {
        case value < 1000:
            customIcon.options.iconUrl = 'recursos/img/pointer1.png';
            break;
        case value >= 1000 && value <= 5000:
            customIcon.options.iconUrl = 'recursos/img/pointer2.png';
            break;
        case value > 5000 && value <= 10000:
            customIcon.options.iconUrl = 'recursos/img/pointer3.png';
            break;
        case value > 10000:
            customIcon.options.iconUrl = 'recursos/img/pointer4.png';
            break;
        default:
            customIcon.options.iconUrl = 'recursos/img/pointerN.png';
            break;
    }
    return customIcon;
}

function startBackView() {
    var t = document.getElementById("firstGlance");
    t.style.animation = "bajadaGradual 5s forwards ease-in";
    var t2 = document.getElementById("background-image");
    t2.style.animation = "bajadaGradualFondo 5s forwards ease-in";
    setTimeout(function() {
        var elemento = document.createElement("div");
        elemento.id = "transitionDiv";
        elemento.style = "width: 100%; height: 100%; position: fixed; background-color: white; opacity: 0";
        elemento.style.animation = "desvanecer 0.5s forwards reverse";
        document.body.appendChild(elemento);
    }, 3000);
    setTimeout(function() {
        createLocationMap();
        document.getElementById("background-image").remove();
        document.getElementById("firstGlance").remove();
        document.getElementById("transitionDiv").remove();
        var locationMapDiv = document.getElementById("locationMapDiv");
        locationMapDiv.style = "transform: scale(1);";
        locationMapDiv.style.animation = "desvanecer 1s forwards reverse";
    }, 4000);
}