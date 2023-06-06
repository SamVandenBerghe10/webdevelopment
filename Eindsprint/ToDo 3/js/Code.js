let global = {
    lijst: []
}

const setup = () => {
    let element = JSON.parse(localStorage.getItem("taakInformatie"))
    if (element != null) {
        global.lijst = element.lijst
        for (let i = 0; i < global.lijst.length; i++) {
            save(global.lijst[i])
        }
    }
    let image = document.getElementById("image")
    image.addEventListener("click", showForm)

    let annuleerknop = document.getElementById("annuleerknop")
    annuleerknop.addEventListener("click", showImage)
    let allesVerwijderen = document.getElementById("verwijder")
    allesVerwijderen.addEventListener("click", verwijderAlles)
    let teLaat = document.getElementById("telaat")
    teLaat.addEventListener("click", wisselTeLaat)
    let sorteer = document.getElementById("sorteer")
    sorteer.addEventListener("click", sorteerLijst)

    let taak = document.getElementById("taak")
    let beschrijving = document.getElementById("beschrijving")
    let datum = document.getElementById("datum")
    let aanmaakknop = document.getElementById("aanmaakknop")
    aanmaakknop.addEventListener("click", () => {
        let object = {
            Taak: taak.value,
            Beschrijving: beschrijving.value,
            Datum: datum.value
        }
        valideer(object)
    })
}

const showForm = () => {
    let image = document.getElementById("image")
    image.style.display = "none"
    let form = document.getElementById("formulier")
    form.style.display = "block"
}

const showImage = () => {
    let form = document.getElementById("formulier")
    form.style.display = "none"
    let image = document.getElementById("image")
    image.style.display = "block"

    document.getElementById("taak").value = ""
    document.getElementById("beschrijving").value = ""
    document.getElementById("datum").value = ""
}

const valideer = (object) => {
    if (object.Taak.trim() === "" || object.Beschrijving.trim() === "" || object.Datum.trim() === "") {
        window.alert("een van de velden is leeg")
    } else {
        save(object)
        showImage()
        global.lijst.push(object)
        localStorage.setItem("taakInformatie", JSON.stringify(global))
    }
}

const save = (object) => {
    let opslagveld = document.getElementById("opslagveld")

    let element = document.createElement("div")
    element.classList = "item"
    let p1 = document.createElement("p")
    let text1 = document.createTextNode(object.Taak)
    p1.appendChild(text1)
    element.appendChild(p1)

    let p2 = p1.cloneNode(true)
    p2.childNodes[0].nodeValue = object.Beschrijving
    element.appendChild(p2)

    let datum = new Date(object.Datum)
    let noTimeDatum = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate())
    let nu = new Date()
    let noTimeNu = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate())
    if (noTimeNu > noTimeDatum) {
        element.style.background = "red"
    }

    let p3 = p1.cloneNode(true)
    p3.childNodes[0].nodeValue = "Tegen: " + object.Datum
    element.appendChild(p3)

    let afronden = p1.cloneNode(true)
    p3.childNodes[0].nodeValue = "Taak afronden"
    element.appendChild(afronden)

    opslagveld.appendChild(element)

    afronden.addEventListener("click", verwijderen)
}

const verwijderen = (event) => {
    event.currentTarget.parentNode.remove()
    updateLijst()
}

const verwijderAlles = () => {
    if (window.confirm("ben je zeker dat je alles wilt verwijderen?")) {
        localStorage.clear()
        location.reload()
    }
}

const wisselTeLaat = () => {
    let opslagveld = document.getElementById("opslagveld").children
    let teller = 0;
    let gevonden = false
    while (teller < opslagveld.length && !gevonden) {
        if (opslagveld[teller].style.display === "none") {
            gevonden = true
        }
        teller++
    }
    if (gevonden) {
        for (let i = 0; i < opslagveld.length; i++) {
            opslagveld[i].style.display = "inline-block"
        }
    } else {
        for (let i = 0; i < opslagveld.length; i++) {
            let datum = new Date(opslagveld[i].childNodes[2].childNodes[0].nodeValue.slice(-10))
            let noTimeDatum = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate())
            let nu = new Date()
            let noTimeNu = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate())
            if (noTimeNu >= noTimeDatum) {
                opslagveld[i].style.display = "none"
            }
        }
    }
}

const sorteerLijst = () => {
    let opslagveld = document.getElementById("opslagveld")
    let lijstje = global.lijst.sort((a, b) => Date.parse(a.Datum) - Date.parse(b.Datum));
    for (let i = opslagveld.children.length - 1; i > -1; i--) {
        opslagveld.children[i].remove()
    }
    for (let i = 0; i < lijstje.length; i++) {
        save(lijstje[i])
    }
}

const updateLijst = () => {
    let opslagveld = document.getElementById("opslagveld").children
    let templijst = []
    for (let i = 0; i < opslagveld.length; i++) {
        let object = {
            Taak: opslagveld[i].childNodes[0].childNodes[0].nodeValue,
            Beschrijving: opslagveld[i].childNodes[1].childNodes[0].nodeValue,
            Datum: opslagveld[i].childNodes[2].childNodes[0].nodeValue.slice(-10)
        }
        templijst.push(object)
    }
    global.lijst = templijst
    localStorage.setItem("taakInformatie", JSON.stringify(global))
}
window.addEventListener("load", setup);