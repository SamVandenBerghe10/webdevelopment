const setup = () => {
    let belangrijk = document.getElementsByTagName("p")
    let i = 0;
    for(i=0;i<belangrijk.length;i++)
    {
        if (belangrijk[i].className === "belangrijk")
        belangrijk[i].className = "opvallend"
    }
}
window.addEventListener("load", setup);

