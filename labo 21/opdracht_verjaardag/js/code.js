const setup = () => {
    let datum1 = new Date()
    let datum2 = new Date('10/18/2023')
    let tijd = Math.abs(datum2 - datum1);
    let verschil = Math.ceil(tijd / (1000 * 60 * 60 * 24));
    console.log(verschil)
}
window.addEventListener("load", setup);