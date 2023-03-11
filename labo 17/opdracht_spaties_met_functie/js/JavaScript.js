const setup = () => {
maakMetSpaties("TEST12345")
}
window.addEventListener("load", setup);

const maakMetSpaties = (inputText) => {
    inputText.replaceAll(' ', '')
    let result="";
    for (let i = 0; i < inputText.length; i++) {
        result += inputText.charAt(i) + ' '
    }
    console.log(result)
    return result
}