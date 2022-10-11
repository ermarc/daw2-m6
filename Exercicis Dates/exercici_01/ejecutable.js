let añoNuevo = new Date("2001-01-01 00:00");
let fecha = new Date("2000-12-31 " + prompt("Introduzca una hora:\n"));
let diferencia = (añoNuevo - fecha) / 60000;


if (diferencia == 1440) {
    alert("¡Feliz Año Nuevo!");
} else {
    alert("Quedan " + diferencia + " minuto(s).");
}
