let url = "5Einf.json";

function sendRequest(url) {
    let request = new XMLHttpRequest()

    request.open("GET", url)
    request.send()

    request.onload = function() {
        const json = JSON.parse(request.responseText)
        console.log(JSON.stringify(json))
    }
}

sendRequest(url)


