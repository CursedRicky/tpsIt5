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

let planes = []
function creaProdotti(listaProdotti) {
    let prodottiDiv = document.querySelector(".products")
    for (let i in listaProdotti) {
        let card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("col-3")
        card.classList.add("mx-auto")
        card.classList.add("my-5")
        card.style.width = "18rem"
        card.innerHTML = 
        `<img src="./imgs/${listaProdotti[i].immagine}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${listaProdotti[i].modello}</h5>
            <p class="card-text">€${listaProdotti[i].prezzo}</p>
            <a href="#" class="btn btn-primary">Compra</a>
        </div>`
        planes.push(card)
        
        if (planes.length == 3) {
            let div = document.createElement("div")
            div.classList.add("row")
            for (let y in planes) {
                div.appendChild(planes[y])
            }
            prodottiDiv.appendChild(div)
            planes = []
        }
    }

    let div = document.createElement("div")
    div.classList.add("row")
    for (let y in planes) {
        div.appendChild(planes[y])
    }
    prodottiDiv.appendChild(div)
    
}

readCSV()
readJSON()