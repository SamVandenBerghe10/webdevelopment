let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    lijst: [],
    lijstLocatie: ["img/kaart1.png","img/kaart2.png","img/kaart3.png","img/kaart4.png","img/kaart5.png","img/kaart6.png"],
    lijstVoorkanten: []
}

const setup = () => {
    let matchinggame = document.getElementById("matchinggame")
    matchinggame.style.display = "grid"
    matchinggame.style.gridTemplateColumns="repeat(" + global.AANTAL_HORIZONTAAL + ",165px)"
    matchinggame.style.gridTemplateRows="repeat(" + global.AANTAL_VERTICAAL + ",220px)"
    matchinggame.style.border= "black solid 5px"
    matchinggame.style.padding= "10px"
    matchinggame.style.width = "640px"
    global.lijst = matchinggame.querySelectorAll("img")
    for (let i = 0; i < global.lijst.length; i++) {
        global.lijst[i].setAttribute("src", "img/achterkant.png")
    }
    let teller = 0
    while(teller < 12)
    {
        let getal = Math.round(Math.random()*5)
        let counter = 0
        for (let i = 0; i < global.lijstVoorkanten.length; i++) {
            if (global.lijstVoorkanten[i] === global.lijstLocatie[getal])
            {
                counter++
            }
        }
        if (counter < 2)
        {
            global.lijstVoorkanten[teller] = global.lijstLocatie[getal]
            teller++
        }
    }
    global.lijst[0].addEventListener("click", function () {geklikt(0)})
    global.lijst[1].addEventListener("click", function () {geklikt(1)})
    global.lijst[2].addEventListener("click", function () {geklikt(2)})
    global.lijst[3].addEventListener("click", function () {geklikt(3)})
    global.lijst[4].addEventListener("click", function () {geklikt(4)})
    global.lijst[5].addEventListener("click", function () {geklikt(5)})
    global.lijst[6].addEventListener("click", function () {geklikt(6)})
    global.lijst[7].addEventListener("click", function () {geklikt(7)})
    global.lijst[8].addEventListener("click", function () {geklikt(8)})
    global.lijst[9].addEventListener("click", function () {geklikt(9)})
    global.lijst[10].addEventListener("click", function () {geklikt(10)})
    global.lijst[11].addEventListener("click", function () {geklikt(11)})
}

const geklikt = (getal) =>
{
    global.lijst[getal].setAttribute("src", global.lijstVoorkanten[getal])
    let kaarten = []
    for (let i = 0; i < global.lijstVoorkanten.length; i++) {
        if(global.lijst[i].getAttribute("src") !== "img/achterkant.png")
        {
            kaarten.push(i)
        }
    }
    if(kaarten.length > 1)
    {
        let matchinggame = document.getElementById("matchinggame")
        if (global.lijstVoorkanten[kaarten[0]] === global.lijstVoorkanten[kaarten[1]])
        {
            matchinggame.style.border= "green solid 5px"
            setTimeout(function (){
                global.lijst[kaarten[0]].setAttribute("src", "img/achterkant.png")
                global.lijst[kaarten[1]].setAttribute("src", "img/achterkant.png")
                global.lijst[kaarten[0]].style.visibility='hidden'
                global.lijst[kaarten[1]].style.visibility='hidden'
                matchinggame.style.border= "black solid 5px"
            },1000)
        }
        else
        {
            matchinggame.style.border= "red solid 5px"
            setTimeout(function (){
                global.lijst[kaarten[0]].setAttribute("src", "img/achterkant.png")
                global.lijst[kaarten[1]].setAttribute("src", "img/achterkant.png")
                matchinggame.style.border= "black solid 5px"
            },1000)

        }
    }
    setTimeout(function (){
    let teller = 0
    for (let i = 0; i < global.lijst.length; i++) {
        let style = window.getComputedStyle(global.lijst[i])
        if(style.getPropertyValue("visibility") === "hidden")
        {
            teller++
        }
    }
    if (teller == 12)
    {
        window.alert("Je bent gewonnen")
    }
    },1000)
}
window.addEventListener("load", setup);