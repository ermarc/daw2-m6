function crearAudio() {
    var crearAudio = document.createElement("audio");
    crearAudio.autoplay = "autoplay";
    crearAudio.loop = "loop";
    crearAudio.id = "nuevoAudio"
    var crearSource = document.createElement("source");
    crearSource.src = "recursos/musica.mp3";
    crearSource.type = "audio/mpeg";

    document.body.appendChild(crearAudio);
    document.getElementById("nuevoAudio").appendChild(crearSource);
}

function entrarPagina() {
    var entrarPaginaLink = document.createElement("link");
    entrarPaginaLink.href = "recursos/css/entrarPagina.css";
    entrarPaginaLink.rel = "stylesheet";
    entrarPaginaLink.type = "text/css";
    document.head.appendChild(entrarPaginaLink);
    setTimeout( function() {
        var borrarDivBlanco = document.getElementById("primero");
        borrarDivBlanco.remove();
    }, 550);
    crearAudio();
    setTimeout( function() {
        crearArchivos();
    })
}

function crearArchivos() {
    var crearPenjat100 = document.createElement("button");
    crearPenjat100.onclick =  function() { window.location.href = "Penjat/v1.0.0/index.html" };
    crearPenjat100.textContent = "Penjat v1.0.0";
    crearPenjat100.id = "singleButton";
    document.getElementById("divButtons").appendChild(crearPenjat100);

    var crearPenjatPrimitive = document.createElement("button");
    crearPenjatPrimitive.onclick =  function() { createOldVersionAlert("Penjat/primitive/index.html"); };
    crearPenjatPrimitive.textContent = "primitive";
    crearPenjatPrimitive.id = "singleButton";
    document.getElementById("divButtons").appendChild(crearPenjatPrimitive);
}

function createOldVersionAlert(respuesta) {

    var createOldVersionAlertDiv = document.createElement("div");
    createOldVersionAlertDiv.id = "oldVersionAlertDiv";

    var createOldVersionAlert = document.createElement("h2");
    createOldVersionAlert.id = "oldVersionAlert";
    createOldVersionAlert.innerHTML = "¡Atención! La versión que estás a punto de ejecutar es muy antigua y podría causar problemas de estabilidad en el navegador si sales de ella repentinamente. Asegúrate de cerrar bien el juego por el medio indicado dentro del mismo."
    
    
    var createOldVersionAlertConfirm = document.createElement("button");
    createOldVersionAlertConfirm.id = "oldVersionAlertConfirm";
    createOldVersionAlertConfirm.className = "oldAlertButton";
    createOldVersionAlertConfirm.textContent = "Confirmar";
    createOldVersionAlertConfirm.onclick = function() { window.location.href = respuesta};
    
    
    var createOldVersionAlertReject = document.createElement("button");
    createOldVersionAlertReject.id = "oldVersionAlertReject";
    createOldVersionAlertReject.className = "oldAlertButton";
    createOldVersionAlertReject.textContent = "Cancelar";
    createOldVersionAlertReject.onclick = function() { closeOldVersionAlert(); };

    var crearAudio = document.createElement("audio");
    crearAudio.autoplay = "autoplay";
    crearAudio.id = "audioBroma";
    var crearSource = document.createElement("source");
    crearSource.src = "recursos/equisde.mp3";
    crearSource.type = "audio/mpeg";

    document.body.appendChild(crearAudio);
    document.getElementById("audioBroma").appendChild(crearSource);
    

    document.body.appendChild(createOldVersionAlertDiv);
    document.getElementById("oldVersionAlertDiv").appendChild(createOldVersionAlert);
    document.getElementById("oldVersionAlertDiv").appendChild(createOldVersionAlertConfirm);
    document.getElementById("oldVersionAlertDiv").appendChild(createOldVersionAlertReject);
}

function closeOldVersionAlert() {
    var deleteOldVersionAlert = document.getElementById("oldVersionAlertDiv");
    var deleteOldVersionAlertSound = document.getElementById("audioBroma");
    while (deleteOldVersionAlert.firstChild) {
        deleteOldVersionAlert.firstChild.remove();
    }
    deleteOldVersionAlertSound.remove();
    deleteOldVersionAlert.remove();
}
