//globale variabele, houdt bij: lijst met taken + het volgende ID dat aan een taak gegeven mag worden
let global = {
    lijst: [],
    telaaten: true
}
//setup
const setup = () => {
    //uitpakken en inladen van taken in de localstorage
    let globalobject = JSON.parse(localStorage.getItem("taakInformatie"))
        if (globalobject !== null) {
            global.lijst = globalobject
            for (let i = 0; i < globalobject.length; i++) {
                aanmaken(globalobject[i])
            }
        } else {
            global.lijst = []
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
        }

        valideer(object)

    })
}
//controleerd of de velden niet leeg zijn
const valideer = (object) => {
    if (object.Taak.trim() === "" || object.Beschrijving.trim() === "" || object.Datum.trim() === "") {
        window.alert("een van de velden is leeg")
    } else {//wanneer geen lege inputvelden, idcounter zal omhooggaan, object zal verwerkt worden tot een element, globale update wordt geupdate naar de localstorage
        aanmaken(object)
        nieuwknop()
        global.lijst.push(object)
        localStorage.setItem("taakInformatie", JSON.stringify(global.lijst))
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
    let noTimeDatum = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate())
    let nu = new Date()
    let noTimeNu = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate())
    if (noTimeNu > noTimeDatum) {
        element.style.background = "red"
    }

    let p3 = document.createElement("p")
    let text3 = document.createTextNode("Tegen: " + object.Datum)
    p3.appendChild(text3)
    element.appendChild(p3)

    let afronden = document.createElement("p")
    let text4 = document.createTextNode("Taak afronden")
    afronden.appendChild(text4)
    element.appendChild(afronden)

    opslagveld.appendChild(element)
    //eventlistener om taak te verwijderen, geeft taak ID mee
    afronden.addEventListener("click", verwijderen2)
}
//methode die door een event een taak zal verwijderen(ook uit localstorage)
const verwijderen2 = (event) =>
{
    let element = event.currentTarget.parentNode.children
    let teller = 0
    let gevonden = false
    while(!gevonden && teller < global.lijst.length)
    {
        console.log(element[2].childNodes[0].nodeValue.slice(-10))
        if (element[0].childNodes[0].nodeValue === global.lijst[teller].Taak && element[1].childNodes[0].nodeValue === global.lijst[teller].Beschrijving && element[2].childNodes[0].nodeValue.slice(-10) === global.lijst[teller].Datum)
        {
            global.lijst.splice(teller, 1)
            localStorage.setItem("taakInformatie", JSON.stringify(global.lijst))
            gevonden = true
        }
        teller++
    }
    event.currentTarget.parentNode.remove()
}
//methode om alle taken van het scherm en de localstorage te verwijderen
const verwijderAlleTaken = () => {
    if(confirm("ben je zeker dat je alles wilt verwijderen?"))
    {
        let opslagveld = document.getElementById("opslagveld").children
        for (let i = global.lijst.length-1; i > -1; i--) {
            opslagveld[i].remove()
        }
        global.lijst = []
        localStorage.setItem("taakInformatie", JSON.stringify(global.lijst))
    }
}
//zal de ene keer alle rode taken niet tonen en de andere keer wel
const wisselTeLaat = () => {
    let opslagveld = document.getElementById("opslagveld")
    if (global.telaaten) {
        let lijstje = []
        for (let i = 0; i < global.lijst.length; i++) {
            let datum = new Date(global.lijst[i].Datum)
            let noTimeDatum = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate())
            let nu = new Date()
            let noTimeNu = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate())
            if (noTimeNu <= noTimeDatum) {
                lijstje.push(global.lijst[i])
            }
        }
        for (let i = global.lijst.length - 1; i > -1; i--) {
            opslagveld.children[i].remove()
        }
        for (let i = 0; i < lijstje.length; i++) {
            aanmaken(lijstje[i])
        }
        global.telaaten = false
    } else {
        for (let i = opslagveld.children.length - 1; i > -1; i--) {
            opslagveld.children[i].remove()
        }
        for (let i = 0; i < global.lijst.length; i++) {
            aanmaken(global.lijst[i])
        }
        global.telaaten = true
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
    global.telaaten = true
}
window.addEventListener("load", setup);