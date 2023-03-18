const setup = () => {
    let input = []
    let tijdelijk = ""
    do {
        tijdelijk = window.prompt()
        input.push(tijdelijk)
    }while(tijdelijk.toLowerCase() !== "stop")
    let select = document.getElementById("select")
    input.pop()
    input.sort()
    let code = ""
    for (let i = 0; i < input.length; i++) {
        code += "<option>"+ input[i]+ "</option>"
    }
    select.innerHTML = code

}
window.addEventListener("load", setup);