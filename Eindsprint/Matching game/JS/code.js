let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    lijst: [],
    tempLijst: [],
    kaartenNogOver: 12
}

const setup = () => {
    let kaartveld = document.getElementById("matchinggame")
    kaartveld.style.display = "grid"
    kaartveld.style.gridTemplateColumns = "repeat(" + global.AANTAL_HORIZONTAAL + ",165px)"
    kaartveld.style.gridTemplateRows = "repeat(" + global.AANTAL_VERTICAAL + ",220px)"
    kaartveld.style.border = "black solid 5px"
    kaartveld.style.padding = "10px"
    kaartveld.style.width = "640px"
    for (let i = 0; i < kaartveld.children.length; i++) {
        kaartveld.children[i].setAttribute("src", "img/achterkant.png")
        kaartveld.children[i].addEventListener("click", draaiOm)
    }
    while (global.lijst.length < 12) {
        let nummer = Math.round((Math.random() * 5) + 1)
        let aantal = 0
        for (let j = 0; j < global.lijst.length; j++) {
            if (global.lijst[j] === "img/kaart" + nummer + ".png") {
                aantal++
            }
        }
        if (aantal < 2) {
            global.lijst.push("img/kaart" + nummer + ".png")
        }
    }
    console.log(global.lijst)
}

const draaiOm = (event) => {
    let kaartveld = document.getElementById("matchinggame")
    event.currentTarget.setAttribute("src", global.lijst[event.currentTarget.getAttribute("id")])
    global.tempLijst.push(event.currentTarget)
    if (global.tempLijst.length === 2) {
        let item1 = global.tempLijst[0]
        let item2 = global.tempLijst[1]
        if (item1.getAttribute("src") === item2.getAttribute("src")) {
            kaartveld.style.border = "green solid 5px"

            setTimeout(() => {
                item1.style.visibility = "hidden"
                item2.style.visibility = "hidden"
                kaartveld.style.border = "black solid 5px"
                global.kaartenNogOver -= 2
                if (global.kaartenNogOver === 0) {
                    window.alert("je bent gewonnen")
                }
            }, 1000)

            global.tempLijst = []
        } else {
            kaartveld.style.border = "red solid 5px"
            setTimeout(() => {
                item1.setAttribute("src", "img/achterkant.png")
                item2.setAttribute("src", "img/achterkant.png")
                kaartveld.style.border = "black solid 5px"
            }, 1000)

            global.tempLijst = []
        }
    }

}
window.addEventListener("load", setup);