let fecha1 = new Date(prompt("Introduzca una fecha (formato MM/DD/YY):\n"));
let fecha2 = new Date(prompt("Introduzca una fecha adicional (formato MM/DD/YY):\n"));
let firstDate;

if (fecha2 < fecha1) {
    let temporal;
    temporal = fecha1;
    fecha1 = fecha2;
    fecha2 = temporal;
}

let salida = document.createElement("h2");
salida.textContent = ("Hay una diferencia de " + ((fecha2 - fecha1) / 86400000) + " dias(s) entre una fecha y otra.");
document.body.appendChild(salida);
