const setup = () => {
    let herberekenen = document.getElementsByClassName("herberekenen")
    herberekenen[0].addEventListener("click", update)
}
window.addEventListener("load", setup);

const update = () => {
    let informatie = document.getElementsByClassName("data")

    let bereken1 = Math.round(informatie[0].textContent * informatie[1].value * (1+ (informatie[2].textContent/100)))
    informatie[3].innerHTML = bereken1.toString() + " Eur"
    let bereken2 = Math.round(informatie[4].textContent * informatie[5].value * (1+ (informatie[6].textContent/100)))
    informatie[7].innerHTML = bereken2.toString() + " Eur"
    let bereken3 = Math.round(informatie[8].textContent * informatie[9].value * (1+ (informatie[10].textContent/100)))
    informatie[11].innerHTML = bereken3.toString() + " Eur"
    informatie[12].innerHTML = (bereken1 + bereken2 + bereken3) + " Eur"
}