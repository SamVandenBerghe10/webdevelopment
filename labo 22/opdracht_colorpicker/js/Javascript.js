let global = {
    KleurenLijst: [],
    Rood: 0,
    Groen: 0,
    Blauw: 0
}

const setup = () => {
    let rood = document.getElementsByClassName("red");
    let groen = document.getElementsByClassName("green");
    let blauw = document.getElementsByClassName("blue");
    let kleurdoos = document.getElementsByClassName("kleur");
    let knop = document.getElementById("knop");
    knop.addEventListener("click", save)


    rood[0].addEventListener("change", update)
    rood[0].addEventListener("input", update)

    groen[0].addEventListener("change", update)
    groen[0].addEventListener("input", update)

    blauw[0].addEventListener("change", update)
    blauw[0].addEventListener("input", update)

    if(JSON.parse(localStorage.getItem("lijst")) === null)
    {
        global.KleurenLijst = []
    }
    else
    {
        global.KleurenLijst = JSON.parse(localStorage.getItem("lijst"))
    }
    rood[0].value = localStorage.getItem("Rood")
    groen[0].value = localStorage.getItem("Groen")
    blauw[0].value = localStorage.getItem("Blauw")
    inladen(global.KleurenLijst)
    update()

}


const update = () => {
    let rood = document.getElementsByClassName("red");
    let groen = document.getElementsByClassName("green");
    let blauw = document.getElementsByClassName("blue");
    let kleurdoos = document.getElementsByClassName("kleur");
    let roodtxt = document.getElementsByClassName("redText");
    let greentxt = document.getElementsByClassName("greenText");
    let bluetxt = document.getElementsByClassName("blueText");

    roodtxt[0].innerHTML = rood[0].value
    greentxt[0].innerHTML = groen[0].value
    bluetxt[0].innerHTML = blauw[0].value
    kleurdoos[0].style.backgroundColor=`rgb(${rood[0].value},${groen[0].value},${blauw[0].value})`;
    global.Rood = rood[0].value
    localStorage.setItem("Rood", global.Rood)
    global.Groen = groen[0].value
    localStorage.setItem("Groen", global.Groen)
    global.Blauw = blauw[0].value
    localStorage.setItem("Blauw", global.Blauw)

}

const save = () => {
    let element = document.createElement('div')
    let button = document.createElement('input')
    let rood = document.getElementsByClassName("red");
    let groen = document.getElementsByClassName("green");
    let blauw = document.getElementsByClassName("blue");
    button.setAttribute('type', 'button')
    button.setAttribute('value', 'x')
    let kleur = `rgb(${rood[0].value},${groen[0].value},${blauw[0].value})`
    element.style.backgroundColor = kleur
    element.className="doos"
    element.appendChild(button)
    document.getElementById("toevoegen").appendChild(element)
    button.addEventListener("click", verwijder)
    global.KleurenLijst.push(kleur)
    let jsonlijst = JSON.stringify(global.KleurenLijst)
    localStorage.setItem("lijst", jsonlijst)
}

const verwijder = (event) =>
{

    let gevonden = false
    let teller = 0
    while(!gevonden && teller < global.KleurenLijst.length)
    {
        let string = event.currentTarget.parentNode.style.backgroundColor.replaceAll(" ", "")
        if (global.KleurenLijst[teller] === string)
        {
            global.KleurenLijst.splice(teller, 1)
            gevonden = true
            let jsonlijst = JSON.stringify(global.KleurenLijst)
            localStorage.setItem("lijst", jsonlijst)
            event.currentTarget.parentNode.remove()
        }
        teller++
    }

}

const inladen = (lijst) => {
    if (lijst !== null)
    {
        for (let i = 0; i < lijst.length; i++) {
            let element = document.createElement('div')
            let button = document.createElement('input')
            button.setAttribute('type', 'button')
            button.setAttribute('value', 'x')
            element.style.backgroundColor =lijst[i]
            element.className="doos"
            element.appendChild(button)
            document.getElementById("toevoegen").appendChild(element)
            button.addEventListener("click", verwijder)
        }
    }


}
window.addEventListener("load", setup);
