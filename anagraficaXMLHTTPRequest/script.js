let url = "5Einf.json";
let studenti = []

function sendRequest(url) {
    let request = new XMLHttpRequest()

    request.open("GET", url)
    request.send()

    request.onload = function() {
        
        // Si trasforma la richiesta da xml a json
        const json = JSON.parse(request.responseText)
        // Si trasforma il json in stringa
        let strJson = JSON.stringify(json)

        // Si tolgono le parentesi quadre (o graffe a seconda del file) all'inizio e alla fine del JSON
        strJson = strJson.substring(1,strJson.length-1)

        // Si dividono gli elementi 
        let test = strJson.split("},")
        for (let i in test) {
            if (i != test.length-1) {
                test[i] = test[i] + "}"
            }

            // console.log(test[i])
            
            // Si creano gli oggetti degli stuendi e si aggiungo all'array oggetti
            studenti.push(JSON.parse(test[i]))   
        }

        populate(studenti)
        
    }
}

function populate(elementi) {
    // Prendi i nomi degli attributi
    let categorie = Object.keys(elementi[0]);

    for (let i in categorie) {
        let th = document.createElement("th")
        th.style.cssText = "color: #333;"
        th.innerHTML = categorie[i].replaceAll('_', ' ').toUpperCase()
        document.getElementById("intab").append(th)
    }

    for (let i in elementi) {
        const tableRow = document.createElement("tr")
        

        for (let [key, value] of Object.entries(elementi[i])) {
            const tableD = document.createElement("td")
            tableD.innerHTML = value
            tableRow.appendChild(tableD)
        }

        document.getElementById("tabella").appendChild(tableRow)
    }
    
    localStorage.setItem("studenti", JSON.stringify(studenti))
}


function getCurrentDate() {
    let d = new Date()

    const currentDate = `${d.getUTCFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    return(currentDate)
}

function isMajor(dataCompleanno) {
    let dataDiOggi = []

    // Formato data di compleanno dd-mm-yy
    let actDataCompleanno = dataCompleanno.split("-")
    actDataCompleanno.reverse()

    // Formato data effettivo yy-mm-dd
    dataDiOggi = getCurrentDate().split("-")
    if (Number(dataDiOggi[0]) - 18 >= Number(actDataCompleanno[0])) {
        // Potrebbe essere maggiorenne
        if (Number(actDataCompleanno[1]) > Number(dataDiOggi[1])) {
            return false;
        } else if (Number(actDataCompleanno[1]) == Number(dataDiOggi[1])) {
            // Se il mese è lo stesso controlla il giorno
            if (Number(actDataCompleanno[2]) > Number(dataDiOggi[2])) {
                return false;
            }
        }
        // Tutti i requisiti soddisfatti, è maggiorenne
        return true;
    }

    // Non è maggiorenne
    return false;
}

function createTable() {
    let thead = document.createElement("thead")
    let tr = document.createElement("tr")
    tr.setAttribute("id", "intab")
    
    thead.appendChild(tr)
    document.querySelector(".table").appendChild(thead)

    let tbody = document.createElement("tbody")
    tbody.setAttribute("id", "tabella")
    document.querySelector(".table").appendChild(tbody)
}

function filtroMaggiorenne() {
    /*
    Non rilevante -> 2
    Maggiorenne -> 1
    Minorenne -> 0
    */
    
    // Svuota la tabella
    document.querySelector(".table").innerHTML = ""

    createTable()

    let studenti = JSON.parse(localStorage.getItem("studenti"))
    let filteredStudents = []

    studenti.forEach(element => {
        if (isMajor(element.data_di_nascita)) {
            filteredStudents.push(element)
        }
    });

    populate(filteredStudents)  
}



sendRequest(url)

console.log(isMajor("23-10-2007"))
