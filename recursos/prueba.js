function entrarPagina() {
    document.getElementById("primero").onclick = "";
    document.getElementById("primero").style.animation = "desvanecer 0.5s forwards";
    document.getElementById("titulo").style.animation = "brilloAmarillo 1.8s infinite alternate ease-in-out, simpleSkyDrop 0.38s forwards linear, continuousBounce 0.18s forwards infinite ease-out alternate";
    document.getElementById("titulo").style.animationDelay = "0s, 0s, 0.38s";
    document.getElementById("versionText").style.animation = "desvanecer 0.5s reverse forwards 1.2s";
    document.getElementById("musicaFondo").play();
    setTimeout( function() {
        var borrarDivBlanco = document.getElementById("primero");
        borrarDivBlanco.remove();
    }, 550);
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

    var crearPokeDex = document.createElement("button");
    crearPokeDex.onclick =  function() { window.location.href = "Arrays/index.html"; };
    crearPokeDex.textContent = "PokéDex experimental";
    crearPokeDex.id = "singleButton";
    document.getElementById("divButtons").appendChild(crearPokeDex);
}

function createOldVersionAlert(respuesta) {
    playCautionSound();
    document.getElementById("caution").style.transform = "scale(1)";
}

function closeCautionSplash() {
    document.getElementById("caution").style.transform = "scale(0)";
}

function playCautionSound() {
    document.getElementById("cautionSound").currentTime = 0;
    document.getElementById("cautionSound").play();
}