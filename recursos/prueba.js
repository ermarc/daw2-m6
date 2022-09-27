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
    entrarPaginaLink.href = "css/entrarPagina.css";
    entrarPaginaLink.rel = "stylesheet";
    entrarPaginaLink.type = "text/css";
    setTimeout( function() {
        var borrarDivBlanco = document.getElementById("primero");
        borrarDivBlanco.remove()
        crearAudio();
    }, 1200);
}