const global = {
    red: 128,
    green: 128,
    blue: 128,
    lijst: []
}

const setup = () => {
    let object = JSON.parse(localStorage.getItem("colorpicker"))
    if (object !== null) {
        if (object.lijst !== null) {
            global.lijst = object.lijst
            for (let i = 0; i < global.lijst.length; i++) {
                save(global.lijst[i])
            }
        }
        global.red = object.red
        global.green = object.green
        global.blue = object.blue
    }
    let sliderRed = document.getElementById("sliderRed")
    sliderRed.addEventListener("change", update)
    sliderRed.addEventListener("input", update)
    sliderRed.value = global.red
    let roodValue = document.getElementById("redValue")
    let rood = document.createTextNode(global.red)
    roodValue.appendChild(rood)

    let sliderBlue = document.getElementById("sliderBlue")
    sliderBlue.addEventListener("change", update)
    sliderBlue.addEventListener("input", update)
    sliderBlue.value = global.blue
    let blauwValue = document.getElementById("blueValue")
    let blauw = document.createTextNode(global.blue)
    blauwValue.appendChild(blauw)

    let sliderGreen = document.getElementById("sliderGreen")
    sliderGreen.addEventListener("change", update)
    sliderGreen.addEventListener("input", update)
    sliderGreen.value = global.green
    let groenValue = document.getElementById("greenValue")
    let groen = document.createTextNode(global.green)
    groenValue.appendChild(groen)

    let vierkant = document.getElementById("kleurvak")
    vierkant.style.backgroundColor = `rgb(${global.red},${global.green},${global.blue})`

    let saveButton = document.getElementById("save")
    saveButton.addEventListener("click", () => {
        valideer(`rgb(${global.red},${global.green},${global.blue})`)
    })
}

const update = () => {
    let sliderRedValue = document.getElementById("sliderRed").value
    let roodValue = document.getElementById("redValue")
    roodValue.childNodes[0].nodeValue = sliderRedValue
    global.red = sliderRedValue

    let sliderGreenValue = document.getElementById("sliderGreen").value
    let greenValue = document.getElementById("greenValue")
    greenValue.childNodes[0].nodeValue = sliderGreenValue
    global.green = sliderGreenValue

    let sliderBlueValue = document.getElementById("sliderBlue").value
    let blueValue = document.getElementById("blueValue")
    blueValue.childNodes[0].nodeValue = sliderBlueValue
    global.blue = sliderBlueValue

    let vierkant = document.getElementById("kleurvak")
    vierkant.style.backgroundColor = `rgb(${global.red},${global.green},${global.blue})`

    localStorage.setItem("colorpicker", JSON.stringify(global))
}

const valideer = (rgb) => {
    global.lijst.push(rgb)
    localStorage.setItem("colorpicker", JSON.stringify(global))
    save(rgb)
}

const save = (rgb) => {
    let element = document.createElement('div')
    let button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.setAttribute('value', 'x')
    element.style.backgroundColor = rgb
    element.className = "doos"
    element.appendChild(button)
    document.getElementById("onderaan").appendChild(element)
    element.addEventListener("dblclick", wijzig)
    button.addEventListener("click", verwijder)
}

const verwijder = (event) => {
    event.currentTarget.parentNode.remove()
    saveAlleKleuren()
}

const wijzig = (event) => {
    let sliderRed = document.getElementById("sliderRed")
    let sliderBlue = document.getElementById("sliderBlue")
    let sliderGreen = document.getElementById("sliderGreen")
    let bovenaan = document.getElementById("bovenaan")

    let rgb = event.currentTarget.style.backgroundColor
    let colorArr = rgb.slice(
        rgb.indexOf("(") + 1,
        rgb.indexOf(")")
    ).split(", ")
    sliderRed.value = colorArr[0]
    sliderGreen.value = colorArr[1]
    sliderBlue.value = colorArr[2]
    update()
    let saveButton = document.getElementById("save")
    saveButton.remove()
    let button = document.createElement("input")
    button.setAttribute('type', 'button')
    button.setAttribute('value', 'save changes')
    button.setAttribute('id', 'tempButton')
    bovenaan.appendChild(button)
    button.addEventListener("click", () => {
        savewijziging(event.target)
    })
}
const savewijziging = (element) => {
    let bovenaan = document.getElementById("bovenaan")

    element.style.backgroundColor = `rgb(${global.red},${global.green},${global.blue})`
    saveAlleKleuren()

    let button = document.getElementById("tempButton")
    button.remove()
    let saveButton = document.createElement("input")
    saveButton.setAttribute('type', 'button')
    saveButton.setAttribute('value', 'save')
    saveButton.setAttribute('id', 'save')
    bovenaan.appendChild(saveButton)
    saveButton.addEventListener("click", () => {
        valideer(`rgb(${global.red},${global.green},${global.blue})`)
    })
}

const saveAlleKleuren = () => {
    let onderaan = document.getElementById("onderaan").children
    let lijst = []
    for (let i = 0; i < onderaan.length; i++) {
        lijst.push(onderaan[i].style.backgroundColor)
    }
    global.lijst = lijst;
    update()
}
window.addEventListener("load", setup);