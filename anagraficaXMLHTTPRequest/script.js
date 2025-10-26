let studenti = []

let search = document.querySelector(".input-group input")
let majorCheck = document.getElementById("majorCheck")

function main() {
    let url = "5Einf.json";
    sendRequest(url)
    setupEventListener()
}

function setupEventListener() {
    search.addEventListener("input", cerca)
    majorCheck.addEventListener("input", cerca)
}

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

        populateTable(studenti)
        
    }
}

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
    if (Number(dataDiOggi[0]) - 18 == Number(actDataCompleanno[0])) {
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
    
    } else if (Number(dataDiOggi[0]) - 18 > Number(actDataCompleanno[0])) {
        return true;
    }

    // Non è maggiorenne
    return false;
}

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