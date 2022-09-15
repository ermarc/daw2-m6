// Joc del Penjat

// Recopilación de 'alerts' que introducen al menú del juego y que lo concluyen una vez se haya regresado de la función 'mainMenu'.
alert("¡Bienvenido al Ahorcado!");
mainMenu();
alert("¡Gracias por jugar!");

// Se recopilan las estadísticas de partidas jugadas, partidas ganadas y partidas perdidas.
// El booleano 'endGame' se volverá verdadero una vez se haya seleccionado la opción 3 (ver detalles en la función 'showMenu()').
// Una vez se haya salido de 'mainGame()', se sumará una unidad a la variable 'wonGames' y, en caso contrario, se añadirá una unidad a 'lostGames'.
// En ambos casos se añadirá una unidad a la variable 'playedGames', como es debido.
function mainMenu() {
    let endGame = false;
    let playedGames = 0;
    let wonGames = 0;
    let lostGames = 0;
    while (!endGame) {
        let menuInput = showMenu();
        switch (menuInput) {
            case 1:
                if (mainGame()) {
                    wonGames++;
                } else {
                    lostGames++;
                }
                playedGames++;
                break;
            case 2:
                showStats(playedGames, wonGames, lostGames);
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

// Impresión del menú en un 'alert' que además recoge una opción seleccionada mediante 'prompt'.
// Dicha selección se convertirá a valor numérico y se devolverá a la función previa 'mainMenu()'.
function showMenu() {
    let menuInput = parseInt(prompt("Introduce una opción:\n\n1. Iniciar una partida.\n2. Mostrar estadísticas.\n3. Salir del juego.\n\n"));
    return Number(menuInput);
}

// Recopilación de alerts para mostrar las estadísticas.
// Se utilizan diferentes alerts en caso de que la variable 'playedGames' sea cero para evitar problemas de división por cero.
function showStats(playedGames, wonGames, lostGames) {
    if (playedGames != 0) {
        alert(  "¡Bienvenido/a a tu vitrina! Aquí podrás consultar tus estadísticas.\n\n" +
                "Total de partidas jugadas: " + playedGames + ".\n" +
                "Total de partidas ganadas: " + wonGames +  ", representando el " + (wonGames/playedGames)*100 + "% de partidas.\n" +
                "Total de partidas perdidas: " + lostGames + ", representando el " + (lostGames/playedGames)*100 + "% de partidas.");
    } else {
        alert(  "¡Bienvenido/a a tu vitrina! Aquí podrás consultar tus estadísticas.\n\n" +
                "Total de partidas jugadas: " + playedGames + ".\n" +
                "Total de partidas ganadas: " + wonGames +  ", representando el 0% de partidas.\n" +
                "Total de partidas perdidas: " + lostGames + ", representando el 0% de partidas.");
    }
}

// Función del juego principal.
// Comprende las variables 'word', para almacenar la palabra escrita, 'resolvedWord' que contendrá las letras acertadas,
// 'prepareAlert' para programar los Strings necesarios para anunciarlos en un solo 'alert', 'currentLetter' para almacenar la letra introducida,
// 'failedAttempts' para almacenar los intentos fallidos y 'failedLetters' para almacenar las letras incorrectas.
//
// Se entra en un bucle que se repite hasta que se cumpla la condición de 'checkIfWordHasBeenResolved()' o si se hace un break al superar el límite de 6 fallos.
// Se irán haciendo concurrentes comprobaciones que, en caso de no ser válidas, desembocarán en un 'continue' para repetir el bucle y no tomar la errata en cuenta.
// Estas erratas comprenden letras repetidas y textos introducidos de longitud mayor a 1, no contarán como intentos fallidos.
//
// Las erratas validadas por la función 'checkIfLetterIsCorrect()' sí contarán como intentos fallidos.
// En caso de haber ganado, se cancelará la función con un 'return' verdadero, en caso contrario, se hará con un 'return' falso.
function mainGame() {
    let word = prompt("¡Bienvenido/a! Introduce una palabra para resolver:").toUpperCase();
    let resolvedWord = "";
    let prepareAlert = "";
    let failedAttempts = 0;
    let failedLetters = "";
    let currentLetter = "";
    while (!checkIfWordHasBeenResolved(word, resolvedWord)) {
        prepareAlert = "Introduce una letra para continuar:\n\n    " + printResolvedWord(word, resolvedWord) +
                       "\n\nLetras falladas " + failedAttempts + "/6: ";
        if (failedAttempts === 0) {
            prepareAlert = prepareAlert + "Ninguna."
        } else {
            for (let i = 0; i < failedLetters.length; i++) {
                prepareAlert = prepareAlert + failedLetters.charAt(i);
                if (i === failedLetters.length-1) {
                    prepareAlert = prepareAlert + ".";
                } else {
                    prepareAlert = prepareAlert + ", ";
                }
            }
        }
        currentLetter = prompt(prepareAlert).toUpperCase();
        if (!justOneLetter(currentLetter)) {
            alert("El texto que has introducido no corresponde con una única letra.");
            continue;
        }
        if (currentLetterMayBeRepeated(currentLetter, resolvedWord, failedLetters)) {
            alert("La letra que has introducido ya ha sido utilizada anteriormente.");
            continue;
        }
        if (checkIfLetterIsCorrect(currentLetter, word)) {
            prepareAlert = "¡Enhorabuena! Parece que has acertado una letra.\nEste ha sido tu avance:\n\n" + printResolvedWord(word, resolvedWord);
            resolvedWord = resolvedWord + currentLetter;
            prepareAlert = prepareAlert + "   ----->   " + printResolvedWord(word, resolvedWord);
            alert(prepareAlert);
        } else {
            failedAttempts++;
            failedLetters = failedLetters + currentLetter;
            alert("¡Incorrecto! Te quedan " + (6-failedAttempts) + " intento(s).");
            if (failedAttempts === 6) {
                alert("¡Has perdido!");
                break;
            }
        }
        if (checkIfWordHasBeenResolved(word, resolvedWord)) {
            alert("¡Has ganado!");
        }
    }
    if (checkIfWordHasBeenResolved(word, resolvedWord)) {
        return Boolean(true);
    }
    return Boolean(false);
}

// Función que comprueba mediante las variables 'word' y 'resolveWord' si la palabra a adivinar ya ha sido descifrada.
// Utiliza las funciones 'printResolvedWord()' y 'clearEmptySpaces()' para conseguir una versión limpia y ordenada de 'resolvedWord()'.
function checkIfWordHasBeenResolved(word, resolvedWord) {
    if (word == clearEmptySpaces(printResolvedWord(word, resolvedWord))) {
        return Boolean(true);
    }
    return Boolean(false);
}

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

// Función que obtiene dos variables de tipo String y que verifica si la letra introducida en la función 'mainGame()' coincide con alguna presente en 'word'.
// En caso afirmativo, se devuelve un valor booleano verdadero para proceder con el avance del juego.
// En caso negativo, se devuelve un valor booleano falso para alertar y penalizar al jugador.
function checkIfLetterIsCorrect(currentLetter, word) {
    for (let i = 0; i < word.length; i++) {
        if (currentLetter === word.charAt(i)) {
            return Boolean(true);
        }
    }
    return Boolean(false);
}

// Función que obtiene tres variables de tipo String y que verifica si la letra introducida en la función 'mainGame()' coincide con alguna presente en 'failedLetters'.
// En caso afirmativo, se devuelve un valor booleano verdadero para alertar al jugador de un caso de letra repetida.
// En caso negativo, se devuelve un valor booleano falso a modo de "falsa alarma" y proceder con el juego con normalidad.
function currentLetterMayBeRepeated(currentLetter, resolvedWord, failedLetters) {
    for (let i = 0; i < resolvedWord.length; i++) {
        if (currentLetter === resolvedWord.charAt(i)) {
            return Boolean(true);
        }
    }
    for (let i = 0; i < resolvedWord.length; i++) {
        if (currentLetter === failedLetters.charAt(i)) {
            return Boolean(true);
        }
    }
    return Boolean(false);
}

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
function printResolvedWord(word, resolvedWord) {
    let preparePrint = "";
    let concreteLetter = 0;
    let validLetter = false;
    for (let i = 0; i < word.length; i++) {
        validLetter = false;
        for (let j = 0; j < resolvedWord.length; j++) {
            if (word.charAt(i) == resolvedWord.charAt(j)) {
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