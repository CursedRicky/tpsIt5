let urlJSON = "./products/linea.json"
let urlXML = "./products/ultraleggeri.xml"
let urlCSV = "./products/generale.csv"

let search = document.querySelector(".input-group input")
search.addEventListener("input", cerca)

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
        let items = []
        const xmlContent = request.response
        
        const xmlDocument = new DOMParser().parseFromString(xmlContent, "text/xml") 
        const aerei = xmlDocument.querySelectorAll("aereo") // Prendi tutti i tag eareo

        for (const aereo of aerei) {
            const item = {nome  : aereo.querySelector("nome").textContent, modello: aereo.querySelector("modello").textContent, prezzo: aereo.querySelector("prezzo").textContent, immagine: aereo.querySelector("immagine").textContent, sconto: aereo.querySelector("sconto").textContent, descrizione: aereo.querySelector("descrizione").textContent}
            items.push(item)
        }
        creaProdotti(items)
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
                const item = {nome  : effData[0], modello: effData[1], prezzo: effData[2], immagine: effData[3], sconto: effData[4], descrizione: effData[5]}
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
        listaProdotti[i].immagine = listaProdotti[i].immagine.replaceAll(" ", "")
        card.innerHTML = 
        `<img src="./imgs/${listaProdotti[i].immagine}" class="card-img-top" alt="...">`
        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        let aCardTitle = document.createElement("a")
        aCardTitle.href = "./product.html"
        let cardTitle = document.createElement("h5")
        cardTitle.innerHTML = listaProdotti[i].modello
        cardTitle.classList.add("card-title")
        cardTitle.onclick = function () {
            localStorage.setItem("prodotto", JSON.stringify(listaProdotti[i]))
        }
        aCardTitle.appendChild(cardTitle)
        cardBody.appendChild(aCardTitle)

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerHTML = listaProdotti[i].prezzo + " €"
        cardBody.appendChild(cardText)

        let carrello = document.createElement("a")
        carrello.onclick = function () {

            let cart = localStorage.getItem("cart")
            console.log(cart)
            if (cart == null) {
                cart = JSON.stringify(listaProdotti[i])
            } else {
                cart += "|" + JSON.stringify(listaProdotti[i])
            }
            alert("Prodotto aggiunto al carrello!")
            localStorage.setItem("cart", cart)
        }
        carrello.innerHTML = "+"
        carrello.classList.add("btn")
        carrello.classList.add("btn-primary")
        cardBody.appendChild(carrello)

        card.appendChild(cardBody)
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

function cerca() {
    let table_rows = document.querySelectorAll(".products")
    let searchData = search.value
    
    for (let products of table_rows) {
        let row = products.querySelectorAll(".row")
        for (let ins of row) {
            let cards = ins.querySelectorAll(".card")
            for (let card of cards) {
                let title = card.querySelector(".card-title").textContent
                if (title.toLowerCase().indexOf(searchData.toLowerCase())==-1) {
                    card.classList.toggle("nascosto", true)
                } else {
                    card.classList.toggle("nascosto", false)
                }
            }
        }
    }
}

readCSV()
readJSON()
readXML()