const setup = () => {
    trigrams("onoorbaar")
}
window.addEventListener("load", setup);

const trigrams = (woord) =>
{
    for (let i = 0; i < woord.length-2; i++) {
        console.log(woord.slice(i, i+3))
    }
}