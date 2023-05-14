const global = {
    lijst: []
}
const setup = () => {
    let invoerLijst = JSON.parse(localStorage.getItem("Tafels"))
    if (invoerLijst === null) {
        global.lijst = []
    } else {
        global.lijst = invoerLijst
        for (let i = 0; i < global.lijst.length; i++) {
            maakTafels(global.lijst[i])
        }
    }
    let button = document.getElementById("button")
    button.addEventListener("click", () => {
        valideer(getInput())
    })
}
const getInput = () => {
    return document.getElementById("invulVak").value
}
const valideer = (input) => {
    let nummer = Number(input)
    if (Number.isInteger(nummer)) {
        let date = new Date()
        let object = {
            getal: nummer,
            tijdstip: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        maakTafels(object)
        global.lijst.push(object)
        localStorage.setItem("Tafels", JSON.stringify(global.lijst))
    }

}
const maakTafels = (object) => {
    let hok = document.getElementById("hok")
    let tabel = document.createElement("div")
    tabel.classList = "tabel"
    let kop = document.createElement("div")
    let textKop = document.createTextNode("Tafel van " + object.getal + " aangemaakt op " + object.tijdstip)
    kop.appendChild(textKop)
    kop.classList = "kop"
    tabel.appendChild(kop)
    for (let i = 0; i < 10; i++) {
        let lijntje = document.createElement("div")
        lijntje.classList = "inhoud"
        let textInhoud = document.createTextNode(object.getal + " x " + (i + 1) + " = " + (object.getal * (i + 1)))
        lijntje.appendChild(textInhoud)
        tabel.appendChild(lijntje)
    }
    hok.appendChild(tabel)
    document.getElementById("invulVak").value = ""
}
window.addEventListener("load", setup);