let url = "5Einf.json";

function sendRequest(url) {
    let request = new XMLHttpRequest()

    request.open("GET", url)
    request.send()

    request.onload = function() {
        let studenti = []

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

function populate(studenti) {
    // Prendi i nomi degli attributi
    let categorie = Object.keys(studenti[0]);

    for (let i in categorie) {
        let th = document.createElement("th")
        th.style.cssText = "color: #333;"
        th.innerHTML = categorie[i].replaceAll('_', ' ').toUpperCase()
        document.getElementById("intab").append(th)
    }

    for (let i in studenti) {
        const tableRow = document.createElement("tr")
        const tableHead = document.createElement("th")
        tableHead.innerHTML = Number(i)+1
        tableRow.appendChild(tableHead)

        for (let [key, value] of Object.entries(studenti[i])) {
            const tableD = document.createElement("td")
            tableD.innerHTML = value
            tableRow.appendChild(tableD)
        }

        for (let y = 0; y<categorie.length; y++) {
            
        }
        document.getElementById("tabella").appendChild(tableRow)
    }
}

sendRequest(url)

let currentDate = ""

function getCurrentDate() {
    let dateUrl = "http://api.geonames.org/timezoneJSON?formatted=true&lat=47.01&lng=10.2&username=curseddo&style=full"
    let request = new XMLHttpRequest()

    request.open("GET", dateUrl)
    request.send()
    
    
    request.onload = function() {

        const json = JSON.parse(request.responseText)

        let currentDate = json.sunrise.split(" ")[0]
        localStorage.setItem("date", currentDate)
    }

    return(localStorage.getItem("date"))
    
}

function isMajor(dataCompleanno) {
    let date = []
    
}

console.log(getCurrentDate())