let fecha = new Date();
let fechaInicial = new Date(fecha.getFullYear() + "-01-01");
let diferencia = parseInt((fecha-fechaInicial)/86400000);
var printFirst = document.createElement("h2");
var printSecond = document.createElement("h2");

printFirst.textContent = ("Avui és " + fecha.getDate() + " del mes " + fecha.getMonth() + " de l'any " + fecha.getFullYear());
printFirst.textContent = printFirst.textContent + (", han passat " + parseInt(diferencia/7+1) + " setmanes, portem un " + ((diferencia/365)*100).toFixed(2) + "% i queden " + (365-diferencia) + " dies per acabar el " + fecha.getFullYear() + ".");

diferencia = (fecha.getHours() * 3600) + (fecha.getMinutes() * 60) + (fecha.getSeconds());

/*
let moreDiferencia = new Date(fecha.getFullYear() + "-" + fecha.getMonth() + "-" + (fecha.getDate()+1) + " 00:00:00");
moreDiferencia = (moreDiferencia - fecha) / 60000;
alert(moreDiferencia/1000);
*/

printSecond.textContent = ("Ara són les " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ", hem passat pel " + ((diferencia/86400)*100).toFixed(2) + "% del dia, i ens queda " + (100-(diferencia/86400)*100).toFixed(2) + "% per acabar el dia.");

document.body.appendChild(printFirst);
document.body.appendChild(printSecond);