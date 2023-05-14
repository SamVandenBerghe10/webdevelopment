let global = {
    lijst: []
}
const setup = () => {
    let go = document.getElementById("button")
    go.addEventListener("click", zoeken)
    global.lijst = JSON.parse(localStorage.getItem("lijst"))
    if (global.lijst === null) {
        global.lijst = []
    } else {
        for (let i = 0; i < global.lijst.length; i++) {
            aanmaken(global.lijst[i])
        }
    }
}
const zoeken = () => {
    let zoekbalk = document.getElementById("zoekbalk")
    let zoeken = zoekbalk.value
    zoekbalk.value = ""
    if (zoeken[0] === "/") {
        if (zoeken[2] === " ") {
            let object = {
                text: zoeken.slice(3, zoeken.length), title: zoeken[1], url: ""
            }
            valideren(object)
        } else {
            window.alert("Unknown command prefix")
        }
    } else if (zoeken === "refresh pagina") {
        document.location.reload()
    } else if (zoeken !== "") {
        window.alert("Invalid Command")
    }
}
const valideren = (object) => {
    let zoeksoort = object.title
    let zoekterm = object.text
    let gevonden = false
    if (zoeksoort === "g") {
        gevonden = true
        object.title = "Google"
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        object.url = "https://www.google.com/search?q=" + bewerktezoekterm
    } else if (zoeksoort === "y") {
        gevonden = true
        object.title = "Youtube"
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        object.url = "https://www.youtube.com/results?search_query=" + bewerktezoekterm
    } else if (zoeksoort === "t") {
        gevonden = true
        object.title = "Twitter"
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        object.url = "https://www.twitter.com/hashtag/" + bewerktezoekterm
    } else if (zoeksoort === "i") {
        gevonden = true
        object.title = "Instagram"
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        object.url = "https://www.instagram.com/explore/tags/" + bewerktezoekterm + "/"
    }
    if (gevonden === true) {
        aanmaken(object)
        global.lijst.push(object)
        localStorage.setItem("lijst", JSON.stringify(global.lijst))
        window.open(object.url)
    } else {
        window.alert("Unknown command prefix")
    }
}
const aanmaken = (object) => {
    let zoeksoort = object.title
    let zoekterm = object.text
    let url = object.url
    let blokje = document.createElement("div")
    let button = document.createElement("input")
    let text = ""
    let link = document.createElement("a")
    button.setAttribute("type", "button")
    button.setAttribute("value", "Go!")
    if (zoeksoort === "Google") {
        text = document.createTextNode(zoeksoort)
        blokje.style.backgroundColor = "rgb(0,153,255)"
        link.setAttribute("href", url)
        button.style.backgroundColor = "rgb(255,128,0)"
        button.style.color = "yellow"
    } else if (zoeksoort === "Youtube") {
        text = document.createTextNode(zoeksoort)
        blokje.style.backgroundColor = "rgb(255,0,0)"
        link.setAttribute("href", url)
        button.style.backgroundColor = "rgb(0,0,0)"
        button.style.color = "white"
    } else if (zoeksoort === "Twitter") {
        text = document.createTextNode(zoeksoort)
        blokje.style.backgroundColor = "rgb(102,178,255)"
        link.setAttribute("href", url)
        button.style.backgroundColor = "rgb(0,0,0)"
        button.style.color = "white"
    } else if (zoeksoort === "Instagram") {
        text = document.createTextNode("Instagram")
        blokje.style.backgroundColor = "rgb(255,102,178)"
        link.setAttribute("href", url)
        button.style.backgroundColor = "rgb(255,153,1)"
        button.style.color = "yellow"
    }
    link.setAttribute("target", "_blank")
    let p = document.createElement("p")
    p.appendChild(text)
    p.classList.add("blokjeText")
    p.appendChild(document.createElement("br"))
    let text2 = document.createTextNode(zoekterm)
    p.appendChild(text2)
    p.appendChild(document.createElement("br"))
    blokje.classList.add("blokje")
    blokje.classList.add("col-4")
    blokje.classList.add("m-3")
    blokje.appendChild(p)
    link.appendChild(button)
    blokje.appendChild(link)
    let blokjesveld = document.getElementById("blokjesveld")
    blokjesveld.appendChild(blokje)
}
window.addEventListener("load", setup);