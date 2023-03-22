const setup = () => {
    let node = document.getElementById("abc")
    let children = node.childNodes
    console.log(children[0].nodeValue)
    console.log(children[1].childNodes[0].nodeValue)
    console.log(children[2].nodeValue)
}
window.addEventListener("load", setup);