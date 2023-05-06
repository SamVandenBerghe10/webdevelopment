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
                Zoekterm: zoeken.slice(3, zoeken.length),
                Zoeksoort: zoeken[1]
            }
            valideren(object)
        } else {
            window.alert("Unknown command prefix")
        }

    }else if(zoeken === "refresh pagina")
    {
        document.location.reload()
    }
    else if (zoeken !== "") {
        window.alert("Invalid Command")
    }

}
const valideren = (object) => {
    let zoeksoort = object.Zoeksoort
    if (zoeksoort === "g" || zoeksoort === "y" || zoeksoort === "t" || zoeksoort === "i") {
        aanmaken(object)
        global.lijst.push(object)
        localStorage.setItem("lijst", JSON.stringify(global.lijst))
        openLink(object)
    } else {
        window.alert("Unknown command prefix")
    }
}
const aanmaken = (object) => {
    let zoeksoort = object.Zoeksoort
    let zoekterm = object.Zoekterm
    let blokje = document.createElement("div")
    let button = document.createElement("input")
    let text = ""
    let link = document.createElement("a")
    button.setAttribute("type", "button")
    button.setAttribute("value", "Go!")
    if (zoeksoort === "g") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        text = document.createTextNode("Google")
        blokje.style.backgroundColor = "rgb(0,153,255)"
        link.setAttribute("href", "https://www.google.com/search?q=" + bewerktezoekterm)
        button.style.backgroundColor = "rgb(255,128,0)"
        button.style.color = "yellow"
    } else if (zoeksoort === "y") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        text = document.createTextNode("Youtube")
        blokje.style.backgroundColor = "rgb(255,0,0)"
        link.setAttribute("href", "https://www.youtube.com/results?search_query=" + bewerktezoekterm)
        button.style.backgroundColor = "rgb(0,0,0)"
        button.style.color = "white"
    } else if (zoeksoort === "t") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        text = document.createTextNode("Twitter")
        blokje.style.backgroundColor = "rgb(102,178,255)"
        link.setAttribute("href", "https://www.twitter.com/hashtag/" + bewerktezoekterm)
        button.style.backgroundColor = "rgb(0,0,0)"
        button.style.color = "white"
    } else if (zoeksoort === "i") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        text = document.createTextNode("Instagram")
        blokje.style.backgroundColor = "rgb(255,102,178)"
        link.setAttribute("href", "https://www.instagram.com/explore/tags/" + bewerktezoekterm + "/")
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
const openLink = (object) => {
    let zoeksoort = object.Zoeksoort
    let zoekterm = object.Zoekterm
    if (zoeksoort === "g") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        window.open("https://www.google.com/search?q=" + bewerktezoekterm)
    } else if (zoeksoort === "y") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "+")
        window.open("https://www.youtube.com/results?search_query=" + bewerktezoekterm)
    } else if (zoeksoort === "t") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        window.open("https://www.twitter.com/hashtag/" + bewerktezoekterm)
    } else if (zoeksoort === "i") {
        let bewerktezoekterm = zoekterm.replaceAll(" ", "")
        window.open("https://www.instagram.com/explore/tags/" + bewerktezoekterm + "/")
    }
}
window.addEventListener("load", setup);