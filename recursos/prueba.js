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
    crearPenjatPrimitive.onclick =  function() { window.location.href = "Penjat/primitive/index.html" };
    crearPenjatPrimitive.textContent = "primitive";
    crearPenjatPrimitive.id = "singleButton";
    document.getElementById("divButtons").appendChild(crearPenjatPrimitive);
}
