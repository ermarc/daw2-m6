
document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);

document.getElementById("editCicle").value = -1

let llistatCicles = [];

function afegirCicle() {
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    let cicle = new Cicle(nom, abreviatura, numAlumnes, categoria);

    if (document.getElementById("editCicle").value === "-1") {
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    } else {
        /*
        var posArray = llistatCicles.findIndex(object => {
            return object.getNom() === cicle.getNom()
        });
        */
       var posArray = document.getElementById("editCicle").value;
        cicle.setNumEdicions(llistatCicles[posArray].getNumEdicions()+1);
        cicle.setDate(new Date);
        llistatCicles[posArray] = cicle;
        console.log(`---------------\nNúmero d'edicions: ${cicle.getNumEdicions()}\nDarrera edició: ${cicle.getDate()}\n---------------`);
        //Editar cicle
    }

    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value = -1;
}

function afegirModul() {
    let mod_cicle = document.getElementById("modul_cicle").value;
    let mod_nom = document.getElementById("modul_nom").value;
    let mod_num = document.getElementById("modul_num").value;
    let mod_time = document.getElementById("modul_hores").value;

    let modul = new Modul(mod_cicle, mod_nom, mod_num, mod_time);
    llistatCicles[mod_cicle].mods.push(modul);
    sortArray(mod_cicle);

    document.getElementById("editCicle").value = -1;

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.getNom()}. ${element.getAbr()}</h5>
                    <h6 class="text-gray-700 dark:text-gray-400">Categoria: ${element.getCat()}</h6>
                    <p class="text-gray-700 dark:text-gray-400">Número d'alumnes: ${element.getNum()}</p>
                    <p class="text-gray-700 dark:text-gray-400">Número d'edicions: ${element.getNumEdicions()}</p>
                    <p class="text-gray-700 dark:text-gray-400">Darrera edició: ${element.getDate()}</p><br>`;
        element.mods.forEach(item => {
            str += `<p class="text-gray-700 dark:text-gray-400">-------------------</p>
            <p class="text-gray-700 dark:text-gray-400">Nom del mòdul: ${item.getNomMod()}</p>
            <p class="text-gray-700 dark:text-gray-400">Número del mòdul: ${item.getNumMod()}</p>
            <p class="text-gray-700 dark:text-gray-400">Hores del mòdul: ${item.getModTime()}</p>
            <p class="text-gray-700 dark:text-gray-400">-------------------</p><br>`
        });
        str += `<button id="btnEliminarCicle" onClick="removeCicle(${index})" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                    <button id="btnEditarCicle" onClick="editCicle(${index})" type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Editar</button>
                    <button type="button" onClick="calcHores( ${index} )" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Càlcul hores</button>
                </div>`;
    });

    document.getElementById("llistat").innerHTML = str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector() {
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function (element, index) {
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i) {
    var elemento = document.getElementsByTagName("main")[0];
    llistatCicles.splice(i, 1);
    actualitzarSelector();
    printLlistat(llistatCicles);
}

//Funció per editar un cicle
function editCicle(i) {
    document.getElementById("cicle_nom").value = llistatCicles[i].getNom();
    document.getElementById("cicle_categoria").value = llistatCicles[i].getCat();
    document.getElementById("cicle_alumnes").value = llistatCicles[i].getNum();
    document.getElementById("cicle_abr").value = llistatCicles[i].getAbr();
    document.getElementById("editCicle").value = i;

    printLlistat(llistatCicles);
}

function sortArray(i) {
    llistatCicles[i].mods.sort(function(a,b) {
        return parseInt(a.getNumMod()) > parseInt(b.getNumMod()) ? 1 : -1;
    });
}

function calcHores(i) {
    var elemento = llistatCicles[i];
    var totalHores = 0;
    llistatCicles[i].mods.forEach(item => {
        totalHores += parseInt(item.getModTime());
    });
    alert("Les hores totals del cicle són " + totalHores);
}

//Funció per netejar els formularis
function netejarFormularis() {
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}

class Cicle {

    constructor(nom, abr, num, cat) {
        this.nom = nom;
        this.abr = abr;
        this.num = num;
        this.cat = cat;
        this.mods = [];
        this.numEd = 0;
        this.lastEdit = "Cap";
    }

    setDate(date) {
        this.lastEdit = date;
    }

    getDate() {
        return this.lastEdit;
    }

    getNom() {
        return this.nom;
    }

    getAbr() {
        return this.abr;
    }

    getNum() {
        return this.num;
    }

    getCat() {
        return this.cat;
    }

    setNumEdicions(numEd) {
        this.numEd = numEd;
    }

    getNumEdicions() {
        return this.numEd;
    }

    setMod(newMod) {
        this.mods.push(newMod);
    }

    toString() {
        let returnString = "\n************************" +
            "\nNombre del cicle: " + this.getNom() +
            "\nAbreviatura del cicle: " + this.getAbr() +
            "\nNombre d'alumnes al cicle: " + this.getNum() +
            "\nCategoria del cicle: " + this.getCat() +
            "\nNúmero d'edicions a la fitxa del cicle: " + this.getNumEdicions() +
            "\nDarrera modificació: " + this.getDate();
        this.mods.forEach(item => {
            returnString = returnString + "\n\n" + item.toString();
        });
        returnString = returnString + "\n************************";
        return returnString;
    }
}

class Modul {

    constructor(mod_cicle, mod_nom, mod_num, mod_time) {
        this.mod_cicle = mod_cicle;
        this.mod_nom = mod_nom;
        this.mod_num = mod_num;
        this.mod_time = mod_time;
    }

    getNomMod() {
        return this.mod_nom;
    }

    setNomMod(newModNom) {
        this.mod_nom = newModNom;
    }

    getNumMod() {
        return this.mod_num;
    }

    setNumMod(newNumMod) {
        this.mod_num = newNumMod;
    }

    getModTime() {
        return this.mod_time;
    }

    setModTime(newModTime) {
        this.mod_time = newModTime;
    }

    toString() {
        return "\n-------------------" +
            "\nNombre del mòdul: " + this.getNomMod() +
            "\nNúmero del mòdul: " + this.getNumMod() +
            "\nHores del mòdul: " + this.getModTime() +
            "\n-------------------";
    }
}
