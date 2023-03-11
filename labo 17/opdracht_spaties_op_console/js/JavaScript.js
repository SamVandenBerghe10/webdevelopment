const setup = () => {
    let button = document.getElementById('button')
    button.addEventListener('click', spatie)
}
window.addEventListener("load", setup);

const spatie = () =>
{
    let text = document.getElementById('text').value.replaceAll(' ', '')
    let nieuwetext = ''
    for (let i = 0; i < text.length; i++) {
        nieuwetext += text.charAt(i) + ' '
    }
    console.log(nieuwetext)
}