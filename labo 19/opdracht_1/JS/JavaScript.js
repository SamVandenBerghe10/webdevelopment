const setup = () => {
    let element = document.querySelectorAll('p')
    element[0].remove()
    let NieuwElement = document.createElement('p')
    NieuwElement.appendChild(document.createTextNode('Good Job!'))
    document.querySelectorAll('body')[0].appendChild(NieuwElement)
}
window.addEventListener("load", setup);