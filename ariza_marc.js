// Joc del Penjat


// Recopilación de 'alerts' que introducen al menú del juego y que lo concluyen una vez se haya regresado de la función 'mainMenu'.
/*
alert("¡Bienvenido al Ahorcado!");
mainMenu();
alert("¡Gracias por jugar!");
*/

let word;
let resolvedWord;
let prepareAlert;
let failedAttempts;
let failedLetters;
let currentLetter;

let yetPlayed = false;


//Función que crea un fichero CSS que contiene animaciones de salida para los botones del menú inicial y animaciones de entrada para los botones del menú principal.
function clearButtonsIntro(respuesta) {

    var botonesCSS = document.createElement("link")
    botonesCSS.rel = "stylesheet";
    botonesCSS.type = "text/css";
    botonesCSS.href = "./recursos/ficherosCSS/botonesCSS.css";
    botonesCSS.id = "botonesCSS";

    document.head.appendChild(botonesCSS);

    if (respuesta != 'neg') {
        document.getElementsByClassName('respuesta')[0].textContent = "Bien...";

        var menuCSS = document.createElement("link");
        menuCSS.rel = "stylesheet";
        menuCSS.type = "text/CSS";
        menuCSS.href = "./recursos/ficherosCSS/introGameCSS.css";
        menuCSS.id = "introGame"
        
        setTimeout(function() {document.head.appendChild(menuCSS)}, 4800);
    } else {
        document.getElementsByClassName('respuesta')[0].textContent = "¿Seguro? Tú lo has querido...";
        setTimeout(function() {rickRoll()}, 4500);
    }
    
}

// Función que crea un fichero CSS que contiene animaciones de salida para los botones del menú principal y animaciones de entrada correspondientes con las posibles opciones.
function clearButtonsMenu(respuesta) {
    
    var botonesCSS = document.createElement("link")
    botonesCSS.rel = "stylesheet";
    botonesCSS.type = "text/css";
    botonesCSS.href = "./recursos/ficherosCSS/menuCSS.css";
    botonesCSS.id = "menuCSS";

    document.head.appendChild(botonesCSS);
    if (respuesta == 'play') {
        setTimeout(function() {     var displayPrompt = document.createElement("link");
                                    displayPrompt.rel = "stylesheet";
                                    displayPrompt.type = "text/css";
                                    displayPrompt.href = "./recursos/ficherosCSS/wordPrompt.css";
                                    displayPrompt.id = "wordPromptCSS";
                                    document.head.appendChild(displayPrompt);
        }, 500);
    } else if (respuesta == 'stats') {
        setTimeout(function() {     var displayStats = document.createElement("link");
                                    displayStats.rel = "stylesheet";
                                    displayStats.type = "text/css";
                                    displayStats.href = "./recursos/ficherosCSS/displayStats.css";
                                    displayStats.id = "displayStats";
                                    document.head.appendChild(displayStats);

        }, 500);
        setTimeout(function() { printStats();
        }, 100);
    } else if (respuesta == 'delete') {
        setTimeout(function() {     var displayDelete = document.createElement("link");
                                    displayDelete.rel = "stylesheet";
                                    displayDelete.type = "text/css";
                                    displayDelete.href = "./recursos/ficherosCSS/borrarDatosCSS.css";
                                    displayDelete.id = "displayDelete";
                                    document.head.appendChild(displayDelete);
        }, 500);
    }
}

function deleteSaveData() {
    window.localStorage.clear();
    closeDeleteSection();
}


function closeDeleteSection() {
    var closeDelete = document.createElement("link");
    closeDelete.rel = "stylesheet";
    closeDelete.type = "text/css";
    closeDelete.href = "./recursos/ficherosCSS/cerrarBorrarDatosCSS.css";
    closeDelete.id = "closeDelete";
    document.head.appendChild(closeDelete);

    var deleteMenuCSS = document.getElementById("menuCSS");
    var deleteIntroGameCSS = document.getElementById("introGame");
    var deleteBorrarDatosCSS = document.getElementById("displayDelete");
    var deleteCloseDeleteCSS = document.getElementById("closeDelete");

    var recreateIntroGame = document.createElement("link")
    recreateIntroGame.rel = "stylesheet";
    recreateIntroGame.type = "text/css";
    recreateIntroGame.href = "./recursos/ficherosCSS/introGameCSS.css";
    recreateIntroGame.id = "introGame";

    setTimeout( function() {
        deleteBorrarDatosCSS.remove();
        deleteMenuCSS.remove();
        deleteIntroGameCSS.remove();
        deleteCloseDeleteCSS.remove();
    }, 300);

    setTimeout( function() {
        document.head.appendChild(recreateIntroGame);
    }, 500);
}


// Función que crea un elemento de vídeo y ejecuta una broma de RickRoll.
function rickRoll() {
    var rickRoll = document.createElement("video");

    rickRoll.src = "rick.mp4";
    rickRoll.autoplay = " ";
    rickRoll.loop = " ";

    document.body.appendChild(rickRoll);
}

// (No usada en la versión con interfaz).
// Se recopilan las estadísticas de partidas jugadas, partidas ganadas y partidas perdidas.
// El booleano 'endGame' se volverá verdadero una vez se haya seleccionado la opción 3 (ver detalles en la función 'showMenu()').
// Una vez se haya salido de 'mainGame()', se sumará una unidad a la variable 'wonGames' y, en caso contrario, se añadirá una unidad a 'lostGames'.
// En ambos casos se añadirá una unidad a la variable 'playedGames', como es debido.
function mainMenu() {
    let endGame = false;
    while (!endGame) {
        let menuInput = showMenu();
        switch (menuInput) {
            case 1:
                if (mainGame()) {
                    wonGames++;
                } else {
                    lostGames++;
                }
                break;
            case 2:
                showStats(wonGames, lostGames);
                break;
            case 3:
                endGame = true;
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    }
}

// (No usada en la versión con interfaz).
// Impresión del menú en un 'alert' que además recoge una opción seleccionada mediante 'prompt'.
// Dicha selección se convertirá a valor numérico y se devolverá a la función previa 'mainMenu()'.
function showMenu() {
    let menuInput = parseInt(prompt("Introduce una opción:\n\n1. Iniciar una partida.\n2. Mostrar estadísticas.\n3. Salir del juego.\n\n"));
    return Number(menuInput);
}

// (No usada en la versión con interfaz).
// Recopilación de alerts para mostrar las estadísticas.
// Se utilizan diferentes alerts en caso de que la variable 'playedGames' sea cero para evitar problemas de división por cero.
function showStats() {
    if ((wonGames + lostGames) != 0) {
        alert(  "¡Bienvenido/a a tu vitrina! Aquí podrás consultar tus estadísticas.\n\n" +
                "Total de partidas jugadas: " + (wonGames + lostGames) + ".\n" +
                "Total de partidas ganadas: " + wonGames +  ", representando el " + ((wonGames/(wonGames + lostGames))*100).toFixed(2) + "% de partidas.\n" +
                "Total de partidas perdidas: " + lostGames + ", representando el " + ((lostGames/(wonGames + lostGames))*100).toFixed(2) + "% de partidas.");
    } else {
        alert(  "¡Bienvenido/a a tu vitrina! Aquí podrás consultar tus estadísticas.\n\n" +
                "Total de partidas jugadas: " + (wonGames + lostGames) + ".\n" +
                "Total de partidas ganadas: " + wonGames +  ", representando el 0% de partidas.\n" +
                "Total de partidas perdidas: " + lostGames + ", representando el 0% de partidas.");
    }
}

// Función que permite la inserción de un texto recopilatorio con las estadísticas de juego del usuario en el elemento 'statsMessage'.
// Utiliza la función 'obtenerValor' para acomodar el uso de 'window' y sus derivadas 'localStorage' y 'getItem'.
// Se usa la función 'parseInt' para convertir el valor
function printStats() {
    checkAndCreate();
    let wonGames = parseInt(obtenerValor("wonGames"));
    let lostGames = parseInt(obtenerValor("lostGames"));
    if (wonGames + lostGames > 0) {
        document.getElementById("statsMessage").innerHTML = "¡Bienvenido/a a tu vitrina! Aquí podrás consultar tus estadísticas.<br><br>Total de partidas jugadas: " + (wonGames + lostGames) + ".<br>Total de partidas ganadas: " +wonGames + ", representando el " + ((wonGames)/(wonGames + lostGames)*100).toFixed(2) + "% de partidas.<br>Total de partidas perdidas: " + lostGames + ", representando el " + ((lostGames)/(wonGames + lostGames)*100).toFixed(2) + "% de partidas.";
    }
}

// Función del juego principal.
function inputWord() {
    resetValues();

    var insertNewImage = document.getElementById("failStatus");
    insertNewImage.src = "./recursos/imgColgado/penjat_0.png";

    let validWord = false;
    word = document.getElementById("wordPrompt").value;
    for (let i = 0; i < word.length; i++) {
        if (isThisALetter(word.charAt(i))) {
            validWord = true;
        } else {
            let validAlternateCharacter = true;
            for (let j = 0; j < resolvedWord.length; j++) {
                if (resolvedWord.charAt(j) == word.charAt(i)) {
                    validAlternateCharacter = false;
                }
            }
            if (validAlternateCharacter) {
                resolvedWord = resolvedWord + word.charAt(i);
            }
        }
    }
    if (validWord) {
        var letrasCSS = document.createElement("link");
        letrasCSS.rel = "stylesheet";
        letrasCSS.type = "text/css";
        letrasCSS.href = "./recursos/ficherosCSS/enterGame.css";
        letrasCSS.id = "enterGame";

        document.head.appendChild(letrasCSS);

        if (!yetPlayed) {
            printLetters();
            yetPlayed = true;
        }
        document.getElementById("failedLettersTracked").textContent = "Letras falladas 0/6 > Ninguna";
        document.getElementById("wordStrip").innerHTML = printResolvedWordFancy();
        document.getElementById("wordPromptText").textContent = "Introduce una palabra o frase para resolver";
    } else {
        document.getElementById("wordPromptText").textContent = "¡Introduce almenos una letra!";
    }
}

// Función que genera todos los botones de letras disponibles a partir de un String preestablecido.
function printLetters() {
    let abecedari = "abcdefghijklmnñopqrstuvwxyzáàéèíóòúç";
    for (let i = 0; i < abecedari.length; i++) {
            var newButton = document.createElement("button");
            newButton.innerHTML = abecedari.charAt(i).toUpperCase();
            newButton.id = "singleLetter";
            newButton.onclick = function() {enterLetter(abecedari.charAt(i).toUpperCase());};
            document.getElementById("abecedari").appendChild(newButton);
    }
}

// Función que reinicia los valores de algunas variables globales para empezar una nueva partida sin restos de la anterior.
function resetValues() {
    resolvedWord = "";
    prepareAlert = "";
    failedAttempts = 0;
    failedLetters = "";
    currentLetter = "";
}

// Función que comprueba si las propiedades 'localStorage' de 'wonGames' y 'lostGames' y las crea en caso negativo.
function checkAndCreate() {
    if (window.localStorage.getItem("wonGames") == null) {
        window.localStorage.setItem("wonGames", "0");
    }
    if (window.localStorage.getItem("lostGames") == null) {
        window.localStorage.setItem("lostGames", "0");
    }
}

// Función que sirve para devolver el valor extraído de un ítem usando un parámetro que corresponde con una clave.
function obtenerValor(nombreClave) {
    return window.localStorage.getItem(nombreClave);
}

// Función que obtiene un item dentro de 'localStorage' que contenga un valor relacionado con las estadísticas de juego.
// Con el segundo parámetro, se indica en cuántas unidades se quiere incrementar el valor extraído de esta clave.
function sumarValor(clave, sumaValor) {
    window.localStorage.setItem(clave, parseInt(window.localStorage.getItem(clave)) + sumaValor);
}

// Función que comprueba mediante las variables 'word' y 'resolveWord' si la palabra a adivinar ya ha sido descifrada.
// Utiliza las funciones 'printResolvedWordFancy()' y 'printResolvedWord()' para conseguir una versión limpia y ordenada de 'resolvedWord()'.
function checkIfWordHasBeenResolved(word, resolvedWord) {
    if (word == printResolvedWord(word, resolvedWord)) {
        return Boolean(true);
    }
    return Boolean(false);
}

function enterLetter(currentLetter) {
    let checkIfCurrentFailed = false;
    let skip = false;
    if (currentLetterMayBeRepeated(currentLetter)) {
        alert("La letra que has introducido ya ha sido utilizada anteriormente.");
        skip = true;
    }
    if (checkIfLetterIsCorrect(currentLetter) && !skip) {
        resolvedWord = resolvedWord + currentLetter;
    } else if (!checkIfLetterIsCorrect(currentLetter) && !skip) {
        failedAttempts++;
        checkIfCurrentFailed = true;
        failedLetters = failedLetters + currentLetter;
        var insertNewImage = document.getElementById("failStatus");
        insertNewImage.src = "./recursos/imgColgado/penjat_" + failedAttempts + ".png";
        if (failedAttempts === 6) {
            checkAndCreate();
            sumarValor("lostGames", 1);
            endGame("¡Has perdido!");
        }
    }
    if (checkIfCurrentFailed && !skip) {
        prepareAlert = "Letras falladas " + failedAttempts + "/6 > ";
        for (let i = 0; i < failedLetters.length; i++) {
             prepareAlert = prepareAlert + failedLetters.charAt(i);
             if (i === failedLetters.length-1) {
                  prepareAlert = prepareAlert + ".";
            } else {
                 prepareAlert = prepareAlert + ", ";
            }
        }
        document.getElementById("failedLettersTracked").textContent = prepareAlert;
    }
    document.getElementById("wordStrip").innerHTML = printResolvedWordFancy();
    if (printResolvedWord() == word) {
        checkAndCreate();
        sumarValor("wonGames", 1);
        endGame("¡Has ganado!");
    }
}

// Función que genera un archivo CSS que contiene animaciones de salida para los principales componentes de juego.
// También contiene animaciones de entrada para el menú principal.
// A su vez, esta función ordena eliminar de manera secuencial y estructurada los CSS de anteriores animaciones ya ejecutadas, por lo que permite un número infinito de reproducciones de las mismas y a su vez permite un ahorro significativo en recursos.

function endGame(respuesta) {

    var mensajeEndGame = document.getElementById("endGameMessage");
    mensajeEndGame.innerHTML = respuesta;
    
    var endGameCSS = document.createElement("link");
    endGameCSS.rel = "stylesheet";
    endGameCSS.type = "text/css";
    endGameCSS.href = "./recursos/ficherosCSS/endGame.css";
    endGameCSS.id = "cssEndGame";
    document.head.appendChild(endGameCSS);

    var deleteEndGameCSS = document.getElementById("cssEndGame");
    var deleteEnterGameCSS = document.getElementById("enterGame");
    var deleteWordPromptCSS = document.getElementById("wordPromptCSS");
    var deleteMenuCSS = document.getElementById("menuCSS");
    var deleteIntroGameCSS = document.getElementById("introGame");

    var recreateIntroGame = document.createElement("link")
    recreateIntroGame.rel = "stylesheet";
    recreateIntroGame.type = "text/css";
    recreateIntroGame.href = "./recursos/ficherosCSS/introGameCSS.css";
    recreateIntroGame.id = "introGame";

    setTimeout( function() {
        deleteEndGameCSS.remove();
        deleteEnterGameCSS.remove();
        deleteWordPromptCSS.remove();
        deleteMenuCSS.remove();
        deleteIntroGameCSS.remove();
    }, 3200);
    
    
    setTimeout( function() {
        document.head.appendChild(recreateIntroGame);
    }, 3500);

}

function closeStats() {
    var endStats = document.createElement("link");

    endStats.rel = "stylesheet";
    endStats.type = "text/css";
    endStats.href = "./recursos/ficherosCSS/endStats.css";
    endStats.id = "endStats";
    document.head.appendChild(endStats);

    var deleteEndStats = document.getElementById("endStats");
    var deleteDisplayStats = document.getElementById("displayStats");
    var deleteMenuCSS = document.getElementById("menuCSS");
    var deleteIntroGameCSS = document.getElementById("introGame");

    var recreateIntroGame = document.createElement("link")
    recreateIntroGame.rel = "stylesheet";
    recreateIntroGame.type = "text/css";
    recreateIntroGame.href = "./recursos/ficherosCSS/introGameCSS.css";
    recreateIntroGame.id = "introGame";

    setTimeout( function() {
        deleteEndStats.remove();
        deleteDisplayStats.remove();
        deleteMenuCSS.remove();
        deleteIntroGameCSS.remove();
    }, 300);

    setTimeout( function() {
        document.head.appendChild(recreateIntroGame);
    }, 500);
}


// (No se ha acabado utilizando).
// Función que obtiene una variable de tipo String y devuelve una variable de valor similar sin ningún espacio blanco presente.
function clearEmptySpaces(wordToClear) {
    let wordCleared = "";
    for (let i = 0; i < wordToClear.length; i++) {
        if (wordToClear.charAt(i) != " ") {
            wordCleared = wordCleared + wordToClear.charAt(i);
        }
    }
    return String(wordCleared);
}

// Función que utiliza las funciones "toUpperCase()" y "toLowerCase()" para comprobar si el carácter enviado es una letra.
// Muy útil teniendo en cuenta que las letras son los únicos carácteres cambiantes usando estas funciones.
function isThisALetter(currentLetter) {
    return Boolean(currentLetter.toUpperCase() != currentLetter.toLowerCase());
}

// (No usada en la versión con interfaz).
// Función que obtiene dos variables de tipo String y que verifica si la letra introducida en la función 'mainGame()' coincide con alguna presente en 'word'.
// En caso afirmativo, se devuelve un valor booleano verdadero para proceder con el avance del juego.
// En caso negativo, se devuelve un valor booleano falso para alertar y penalizar al jugador.
function checkIfLetterIsCorrect(currentLetter) {
    for (let i = 0; i < word.length; i++) {
        if (currentLetter.toLowerCase() == word.charAt(i) || currentLetter.toUpperCase() == word.charAt(i) ) {
            return Boolean(true);
        }
    }
    return Boolean(false);
}

// Función que obtiene tres variables de tipo String y que verifica si la letra introducida en la función 'mainGame()' coincide con alguna presente en 'failedLetters'.
// En caso afirmativo, se devuelve un valor booleano verdadero para alertar al jugador de un caso de letra repetida.
// En caso negativo, se devuelve un valor booleano falso a modo de "falsa alarma" y proceder con el juego con normalidad.
function currentLetterMayBeRepeated(currentLetter) {
    for (let i = 0; i < resolvedWord.length; i++) {
        if (currentLetter === resolvedWord.charAt(i)) {
            return Boolean(true);
        }
    }
    for (let i = 0; i < failedLetters.length; i++) {
        if (currentLetter === failedLetters.charAt(i)) {
            return Boolean(true);
        }
    }
    return Boolean(false);
}

// (No usada en la versión con interfaz).
// Función que recibe una variable de tipo String y valida si ésta es de longitud igual a 1.
// En caso afirmativo, devolverá un valor booleano verdadero para continuar con normalidad.
// En caso negativo, devolverá un valor booleano falso para alertar al jugador.
function justOneLetter(currentLetter) {
    if (currentLetter.length === 1) {
        return Boolean(true);
    }
    return Boolean(false);
}

// Función que recibe dos variables de tipo String y para saber qué letras revelar.
// Este método consiste en ir comparando la palabra completa con las letras adivinadas para ir desbloqueando las letras pertinentes.
function printResolvedWord() {
    let preparePrint = "";
    let concreteLetter = 0;
    let validLetter = false;
    for (let i = 0; i < word.length; i++) {
        validLetter = false;
        for (let j = 0; j < resolvedWord.length; j++) {
            if ((word.charAt(i) == resolvedWord.charAt(j).toLowerCase()) || (word.charAt(i) == resolvedWord.charAt(j).toUpperCase())) {
                validLetter = true;
                concreteLetter = i;
            }
        }
        if (validLetter) {
            preparePrint = preparePrint + word.charAt(concreteLetter);
        }
    }
    return String(preparePrint);
}

// Función que recibe dos variables de tipo String y para saber qué letras revelar.
// Este método consiste en ir comparando la palabra completa con las letras adivinadas para ir desbloqueando las letras pertinentes.
// A contraposición de printResolvedWord(), la versión 'fancy' añade espacios entre letras e imprime un guión bajo en caso de que la letra no haya sido adivinada.
function printResolvedWordFancy() {
    let preparePrint = "";
    let concreteLetter = 0;
    let validLetter = false;
    for (let i = 0; i < word.length; i++) {
        validLetter = false;
        for (let j = 0; j < resolvedWord.length && !validLetter; j++) {
            if ((word.charAt(i) == resolvedWord.charAt(j).toLowerCase()) || (word.charAt(i) == resolvedWord.charAt(j).toUpperCase())) {
                validLetter = true;
                concreteLetter = i;
            }
        }
        preparePrint = preparePrint + " ";
        if (validLetter) {
            preparePrint = preparePrint + word.charAt(concreteLetter);
        } else {
            preparePrint = preparePrint + "_";
        }
    }
    return String(preparePrint);
}