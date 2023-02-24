const setup = () => {
    let btnWijzig = document.getElementById("btn")
    btnWijzig.addEventListener("click", wijzig)
}
window.addEventListener("load", setup);

const wijzig = () =>
{
    let txtInput = document.getElementById("txtInput").value
    let txtLeft = document.getElementById("txtLeft").value
    let txtRight = document.getElementById("txtRight").value
    let txtOutput = document.getElementById("txtOutput")
    let resultaat = txtInput.slice(txtLeft, txtRight)
    txtOutput.innerHTML = resultaat

}