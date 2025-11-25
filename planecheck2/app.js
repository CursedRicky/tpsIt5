let urlJSON = "./products/linea.json"
let urlXML = "./products/ultraleggeri.xml"
let urlCSV = "./products/generale.csv"

function readJSON() {
    let request = new XMLHttpRequest()

    request.open("GET", urlJSON)
    request.send()

    request.onload = function() {
        
        // Si trasforma la richiesta da xml a json
        const json = JSON.parse(request.responseText)

        creaProdotti(json)  
    }
}

function readXML() {
    let request = new XMLHttpRequest()

    request.open("GET", urlXML)
    request.send()

    request.onload = function() {
        creaProdotti(request.responseXML)  
    }
}

function readCSV() {
    let request = new XMLHttpRequest()

    request.open("GET", urlCSV)
    request.send()

    request.onload = function() {
        let items = []
        let response = request.responseText
        let csv = response.split("\n")
        
        for (let i in csv) {
            if (i != 0) {
                let data = csv[i].replaceAll('"', '')
                data = data.replaceAll('\r', '')
                const effData = data.split(",")
                const item = {nome  : effData[0], modello: effData[1], prezzo: effData[2], immagine: effData[3]}
                items.push(item)
            }
        }
        creaProdotti(items)
        
    }
}

function creaProdotti(listaProdotti) {
    let prodottiDiv = document.querySelector(".products")
    for (let i in listaProdotti) {
        let nome = document.createElement("p")
        nome.innerText = listaProdotti[i].modello
        prodottiDiv.appendChild(nome)
    }
}

readCSV()
readJSON()