const setup = () => {
    let element = document.createElement('p')
    element.appendChild(document.createTextNode('Dit is een p element'))
    document.getElementById('myDIV').appendChild(element)

}
window.addEventListener("load", setup);