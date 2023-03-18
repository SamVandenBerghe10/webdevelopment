const setup = () => {
    omzetten("Gisteren zat de jongen op de stoep en at de helft van de appel")
}
window.addEventListener("load", setup);

const omzetten = (zin) => {
    let woorden = zin.split(" ")
    for (let i = 0; i < woorden.length; i++) {
        if (woorden[i] === "de") {
            woorden[i] = "het"
        } else if (woorden[i] === "het") {
            woorden[i] = "de"
        }
    }
    console.log(woorden.join(" "))
}