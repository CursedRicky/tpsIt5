window.onload = function () {
    let prodotto = JSON.parse(localStorage.getItem("prodotto"))
    console.log(prodotto)
    document.querySelector("#nome").innerHTML = prodotto.modello
    document.querySelector("#img").src = "./imgs/" + prodotto.immagine
    document.querySelector("#prezzo").innerHTML = prodotto.prezzo+ " €"
    document.querySelector("#codice").innerHTML = prodotto.nome
    document.querySelector("#descrizione").innerHTML = prodotto.descrizione
}