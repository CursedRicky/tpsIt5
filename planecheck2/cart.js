window.onload = function () {
    const cart = localStorage.getItem("cart")
    let prodotti = cart.split("|")
    let totale = 0
    for (let prodotto of prodotti) {
        const prodottoOBJ = JSON.parse(prodotto)
        const divProdotti = document.getElementById("cart")
        totale += parseInt(prodottoOBJ.prezzo)
        divProdotti.innerHTML +=
        `<div class="row">
            <div class="col-6">${prodottoOBJ.nome}</div>
            <div class="col-2"></div>
            <div class="col-4">${prodottoOBJ.prezzo}€</div>
        </div>`
    }
    const totaleLable = document.getElementById("totale")
    totaleLable.innerHTML = totale +"€"
}

