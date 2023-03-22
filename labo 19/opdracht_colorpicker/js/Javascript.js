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

    kleurdoos[0].style.backgroundColor="rgb(0,0,0)";

}
window.addEventListener("load", setup);

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
    kleurdoos[0].style.backgroundColor=`rgb(${rood[0].value},${groen[0].value},${blauw[0].value}`;
}

const save = () => {
    let element = document.createElement('div')
    let button = document.createElement('input')
    let rood = document.getElementsByClassName("red");
    let groen = document.getElementsByClassName("green");
    let blauw = document.getElementsByClassName("blue");
    button.setAttribute('type', 'button')
    button.setAttribute('value', 'x')
    button.className = 'verwijderen'
    element.style.backgroundColor =`rgb(${rood[0].value},${groen[0].value},${blauw[0].value}`
    element.className="doos"
    element.appendChild(button)
    document.getElementById("toevoegen").appendChild(element)
    button.addEventListener("click", verwijder)
}

const verwijder = (event) =>
{
    event.currentTarget.parentNode.remove()
}
