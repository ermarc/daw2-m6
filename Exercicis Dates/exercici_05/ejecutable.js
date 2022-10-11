let fecha = new Date();
let fecha2 = new Date();
let fecha3 = new Date();
let checkIfMonthIsValid = false;

for (let i = fecha.getMonth(); i < 12 && !checkIfMonthIsValid; i++) {
    if (i == 2 || i == 9) {
        while (fecha2.getMonth() == 2 || fecha2.getMonth() == 9) {
            fecha2.setDate(fecha2.getDate() + 1);
            if (fecha2.getDay() == 0) {
                fecha3 = new Date(fecha2.getTime());
                checkIfMonthIsValid = true;
            }
        }
    } else {
        do {
            fecha2.setDate(fecha2.getDate() + 1);
        } while (fecha2.getDate() != 1);
        if (fecha2.getMonth() == 0) {
            i = -1;
        }
    }
}

var crearTexto = document.createElement("h2");
crearTexto.innerHTML = "Hoy es día " + fecha.getDate() + " del mes " + (parseInt(fecha.getMonth())+1) + " del año " + fecha.getFullYear() + ".<br>Hay una diferencia de " + ((fecha3-fecha)/(3600*1000*24)).toFixed(0) + " días con respecto al próximo cambio de horario.  ";

// console.log(crearTexto.innerHTML);
document.body.appendChild(crearTexto);