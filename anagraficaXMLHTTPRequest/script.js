let studenti = []

let search = document.querySelector(".input-group input")
let majorCheck = document.getElementById("majorCheck")

// Funzione principale
function main() {
    let url = "5Einf.json";
    sendRequest(url)
    setupEventListener()
}

// Funzione che racchiude tutti gli event listener
function setupEventListener() {
    search.addEventListener("input", cerca)
    majorCheck.addEventListener("input", cerca)
}

// Funzione che gestisce la richiesta XMLHTTP al file JSON
function sendRequest(url) {
    let request = new XMLHttpRequest()

    request.open("GET", url)
    request.send()

    request.onload = function() {
        
        // Si trasforma la richiesta da xml a json
        const json = JSON.parse(request.responseText)

        populateTable(json)
        studenti = json
    }
}

// Funzione che riempie la tabella
function populateTable(elementi) {
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
}

// Funzione per ottenere la data del giorno corrente
function getCurrentDate() {
    let d = new Date()

    // Formato data 
    const currentDate = `${d.getDate()}-${d.getMonth()+1}-${d.getUTCFullYear()}`
    return(currentDate)
}

// Funzione per capire se l'alunno è maggiorenne
function isMajor(dataCompleanno) {
    let dataDiOggi = []

    // Formato data dd-mm-yy
    let actDataCompleanno = dataCompleanno.split("-")

    dataDiOggi = getCurrentDate().split("-")
    if (Number(dataDiOggi[2]) - 18 == Number(actDataCompleanno[2])) {
        // Potrebbe essere maggiorenne
        if (Number(actDataCompleanno[1]) > Number(dataDiOggi[1])) {
            return false;
        } else if (Number(actDataCompleanno[1]) == Number(dataDiOggi[1])) {
            // Se il mese è lo stesso controlla il giorno
            if (Number(actDataCompleanno[0]) > Number(dataDiOggi[0])) {
                return false;
            }
        }
        // Tutti i requisiti soddisfatti, è maggiorenne
        return true;
    
    } else if (Number(dataDiOggi[2]) - 18 > Number(actDataCompleanno[2])) {
        return true;
    }

    // Non è maggiorenne
    return false;
}

// Funzione che ricerca un determinato dato all'interno della tabella
function cerca() {
    console.log("Cercazione in corso...")
    let table_rows = document.querySelectorAll("tbody tr")

    table_rows.forEach( (row, i) => {
        let table_data = row.textContent
        let searchData = search.value

        if (table_data.toLowerCase().indexOf(searchData.toLowerCase())==-1) {
            // Cià che si sta cercando non è presente, quindi si rende l'elemento trasparente
            row.classList.toggle("nascosto", true)
        } else {
            if (majorCheck.checked) {
                if (!isMajor(studenti[i].data_di_nascita)) {
                    // Filtro maggiorenne attivo, si rende l'elemento minorenne non visibile
                    row.classList.toggle("nascosto", true)
                } else {
                row.classList.toggle("nascosto", false)
                }    
            } else if (table_data.toLowerCase().indexOf(searchData.toLowerCase())!=-1) {
                row.classList.toggle("nascosto", false)
            }
        }
    })
}

main()