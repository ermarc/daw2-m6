let año1 = new Date(prompt("Introduzca un año:\n") + "-01-01");
let año2 = new Date(prompt("Introduzca un año:\n") + "-01-01");
let firstDate;

if (año2 < año1) {
    let temporal;
    temporal = año1;
    año1 = año2;
    año2 = temporal;
}

for (let i = año1; i <= año2; i.setFullYear(i.getFullYear()+1)) {
    if (i.getDay() == 3) {
        if (firstDate == null) {
            firstDate = i.getFullYear();
        }
    }
}

let salida = document.createElement("h2");
if (firstDate != null) {
    salida.textContent = "El año " + firstDate + " empieza por miércoles.";
} else {
    salida.textContent = "Ningún año del rango de fechas que has introducido empieza por miércoles.";
}
document.body.appendChild(salida);