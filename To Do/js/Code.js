//globale variabele, houdt bij: lijst met taken + het volgende ID dat aan een taak gegeven mag worden
let global = {
    idCount: 0,
    lijst: []
}
//globale variabele, toont of de te laatte taken getoont worden of niet
let telaaten = true
//setup
const setup = () => {
    //uitpakken en inladen van taken in de localstorage
    let globalobject = JSON.parse(localStorage.getItem("taakInformatie"))
    if (globalobject !== null) {
        if (globalobject.lijst !== null) {
            global.lijst = globalobject.lijst
            for (let i = 0; i < globalobject.lijst.length; i++) {
                aanmaken(globalobject.lijst[i])
            }
        } else {
            global.lijst = []
        }
        if (globalobject.idCount !== null) {
            global.idCount = globalobject.idCount
        }
    }
    //roept methode op die toevoegkop aanmaakt en in het inputveld plaatst
    nieuwknop()
    //eventlisteners voor de 3 knoppen onderaan de pagina
    document.getElementById("verwijder").addEventListener("click", verwijderAlleTaken)
    document.getElementById("telaat").addEventListener("click", wisselTeLaat)
    document.getElementById("sorteer").addEventListener("click", sorteer)
}
//maakt de toevoegknop aan en plaats hem in het inputveld
//verwijderd eventueel het formulier
const nieuwknop = () => {
    let inputveld = document.getElementById("inputveld")

    //wanneer het formulier op het scherm staat zal het verwijderd worden
    if (inputveld.children.length > 0) {
        let formulier = document.getElementById("formulier")
        inputveld.removeChild(formulier)
    }
    let element = document.createElement("img")
    element.setAttribute("src", "img/add-button.svg")
    element.setAttribute("id", "button")
    inputveld.appendChild(element)
    //eventlistener voor de aangemaakte button
    element.addEventListener("click", nieuwmenu)
}
const nieuwmenu = () => {
    //verwijderen van de "add" button
    let inputveld = document.getElementById("inputveld")
    let button = document.getElementById("button")
    inputveld.removeChild(button)

    //aanmaken van het formulier voor nieuwe taak
    let element = document.createElement("div")
    element.setAttribute("id", "formulier")

    let label1 = document.createElement("label")
    let text1 = document.createTextNode("Taak")
    label1.appendChild(text1)
    label1.setAttribute("for", "taak")

    let input1 = document.createElement("input")
    input1.setAttribute("type", "text")
    input1.setAttribute("id", "taak")

    let label2 = document.createElement("label")
    let text2 = document.createTextNode("Beschrijving")
    label2.appendChild(text2)
    label2.setAttribute("for", "beschrijving")

    let input2 = document.createElement("input")
    input2.setAttribute("type", "text")
    input2.setAttribute("id", "beschrijving")

    let label3 = document.createElement("label")
    let text3 = document.createTextNode("Datum")
    label3.appendChild(text3)
    label3.setAttribute("for", "datum")

    let input3 = document.createElement("input")
    input3.setAttribute("type", "date")
    input3.setAttribute("id", "datum")

    let divke = document.createElement("div")
    divke.setAttribute("id", "divke")
    let annuleerknop = document.createElement("input")
    annuleerknop.setAttribute("type", "button")
    annuleerknop.setAttribute("id", "annuleerknop")
    annuleerknop.setAttribute("value", "Annuleren")
    let aanmaakknop = document.createElement("input")
    aanmaakknop.setAttribute("type", "button")
    aanmaakknop.setAttribute("id", "aanmaakknop")
    aanmaakknop.setAttribute("value", "Aanmaken")
    divke.appendChild(annuleerknop)
    divke.appendChild(aanmaakknop)


    element.appendChild(label1)
    element.appendChild(input1)
    element.appendChild(label2)
    element.appendChild(input2)
    element.appendChild(label3)
    element.appendChild(input3)
    element.appendChild(divke)

    inputveld.appendChild(element)
    //eventlistener voor de annuleerknop
    annuleerknop.addEventListener("click", nieuwknop)
    //eventlistener voor aanmaakknop
    aanmaakknop.addEventListener("click", () => {
        //object wordt gemaakt met inputwaarden
        let object = {
            Taak: input1.value,
            Beschrijving: input2.value,
            Datum: input3.value,
            ID: global.idCount
        }

        valideer(object)

    })
}
//controleerd of de velden niet leeg zijn
const valideer = (object) => {
    if (object.Taak.trim() === "" || object.Beschrijving.trim() === "" || object.Datum.trim() === "") {
        window.alert("een van de velden is leeg")
    } else {//wanneer geen lege inputvelden, idcounter zal omhooggaan, object zal verwerkt worden tot een element, globale update wordt geupdate naar de localstorage
        global.idCount += 1
        aanmaken(object)
        nieuwknop()
        global.lijst.push(object)
        localStorage.setItem("taakInformatie", JSON.stringify(global))
    }
}

//methode zal megegeven objecten verwerken en genereren in een html to do element
const aanmaken = (object) => {
    let opslagveld = document.getElementById("opslagveld")

    let element = document.createElement("div")
    element.classList = "item"
    let p1 = document.createElement("p")
    let text1 = document.createTextNode(object.Taak)
    p1.appendChild(text1)
    element.appendChild(p1)

    let p2 = document.createElement("p")
    let text2 = document.createTextNode(object.Beschrijving)
    p2.appendChild(text2)
    element.appendChild(p2)

    //wanneer de datum verstreken is zal het element rood zijn
    let datum = new Date(object.Datum)
    let nu = new Date()
    if (nu > datum) {
        let telaat = document.createElement("p")
        let textTelaat = document.createTextNode("Te laat!")
        telaat.appendChild(textTelaat)
        element.style.background = "red"
        element.appendChild(telaat)
    }

    let p3 = document.createElement("p")
    let text3 = document.createTextNode("Tegen: " + object.Datum)
    p3.appendChild(text3)
    element.appendChild(p3)

    let afronden = document.createElement("p")
    let text4 = document.createTextNode("Taak afronden")
    afronden.appendChild(text4)
    element.appendChild(afronden)

    element.setAttribute("data-id", object.ID)
    opslagveld.appendChild(element)
    //eventlistener om taak te verwijderen, geeft taak ID mee
    afronden.addEventListener("click", () => {
        verwijderen(object.ID)
    })
}
//methode die door meegegeven taak ID een taak zal verwijderen(ook uit localstorage)
const verwijderen = (nummer) => {
    let opslagveld = document.getElementById("opslagveld")
    let elementlijst = opslagveld.children
    let teller = 0;
    let gevonden = false;
    while (!gevonden && teller < elementlijst.length) {
        if (Number.parseInt(elementlijst[teller].dataset.id) === nummer) {
            elementlijst[teller].remove()
            for (let i = 0; i < global.lijst.length; i++) {
                if (Number.parseInt(global.lijst[i].ID) === nummer) {
                    global.lijst.splice(i, 1)
                    localStorage.setItem("taakInformatie", JSON.stringify(global))
                }
            }
            gevonden = true
        }
        teller++
    }
}
//methode om alle taken van het scherm en de localstorage te verwijderen
const verwijderAlleTaken = () => {
    for (let i = 0; i < global.lijst.length; i++) {
        verwijderen(global.lijst[i].ID)
    }
    global.lijst = []
    global.idCount = 0
    localStorage.setItem("taakInformatie", JSON.stringify(global))
}
//zal de ene keer alle rode taken niet tonen en de andere keer wel
const wisselTeLaat = () => {
    let opslagveld = document.getElementById("opslagveld")
    if (telaaten) {
        let lijstje = []
        for (let i = 0; i < global.lijst.length; i++) {
            let datum = new Date(global.lijst[i].Datum)
            let nu = new Date()
            if (nu < datum) {
                lijstje.push(global.lijst[i])
            }
        }
        for (let i = global.lijst.length - 1; i > -1; i--) {
            opslagveld.children[i].remove()
        }
        for (let i = 0; i < lijstje.length; i++) {
            aanmaken(lijstje[i])
        }
        telaaten = false
    } else {
        for (let i = opslagveld.children.length - 1; i > -1; i--) {
            opslagveld.children[i].remove()
        }
        let globalobject = JSON.parse(localStorage.getItem("taakInformatie"))
        for (let i = 0; i < globalobject.lijst.length; i++) {
            aanmaken(globalobject.lijst[i])
        }
        telaaten = true
    }
}
//sorteert alle taken volgens datum
const sorteer = () => {
    let opslagveld = document.getElementById("opslagveld")
    //sort methode met binnenin een functie die uitmaakt hoe de lijst gesorteerd wordt
    let lijstje = global.lijst.sort((a, b) => Date.parse(a.Datum) - Date.parse(b.Datum));
    for (let i = opslagveld.children.length - 1; i > -1; i--) {
        opslagveld.children[i].remove()
    }
    for (let i = 0; i < lijstje.length; i++) {
        aanmaken(lijstje[i])
    }
    telaaten = true
}
window.addEventListener("load", setup);