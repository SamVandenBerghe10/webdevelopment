let personen = [];
// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaar = () => {
    console.log("Klik op de knop bewaar");

    // valideer alle input data en controleer of er geen errors meer zijn
    valideer();
    if (valideer() === true)
    {
        if (document.getElementById("Nieuw").value === "true")
        {
            let persoon = {
                Voornaam: document.getElementById("txtVoornaam").value ,
                Achternaam: document.getElementById("txtFamilienaam").value,
                Geboortedatum: document.getElementById("txtGeboorteDatum").value,
                Email: document.getElementById("txtEmail").value,
                AantalKinderen: document.getElementById("txtAantalKinderen").value,
                NummerInRij: document.getElementById("NummerInRij").value,
                Nieuw: "true"
            }
            document.getElementById("Nieuw").value = "false"
            personen.push(persoon)
            updateLijst()
        }
        else
        {
            let persoon = {
                Voornaam: document.getElementById("txtVoornaam").value ,
                Achternaam: document.getElementById("txtFamilienaam").value,
                Geboortedatum: document.getElementById("txtGeboorteDatum").value,
                Email: document.getElementById("txtEmail").value,
                AantalKinderen: document.getElementById("txtAantalKinderen").value,
                NummerInRij: document.getElementById("NummerInRij").value,
                Nieuw: "false"
            }
            personen[document.getElementById("NummerInRij").value] = persoon
            updateLijst()
        }

    }
    // indien ok, bewaar de ingegeven data.
        // een nieuw aangemaakte persoon voegen we toe
        // een bestaande persoon in de lijst passen we aan

    // zorg ervoor dat de naam en voornaam ook aangepast en/of zichtbaar zijn in de lijst na updaten
};

const updateLijst = () =>
{
    let lijst = document.getElementById("lstPersonen")
    while(lijst.hasChildNodes())
    {
        lijst.removeChild(lijst.firstChild)
    }
    for (let i = 0; i < personen.length; i++) {
        let element = document.createElement("option")
        let text = document.createTextNode(personen[i].Voornaam + " " + personen[i].Achternaam)
        element.appendChild(text)
        element.setAttribute("value", JSON.stringify(personen[i]))
        lijst.appendChild(element)
    }
}

// Event listener (btnNieuw click)
const nieuwPersoon = () => {
    console.log("Klik op de knop nieuw");
    document.getElementById("txtVoornaam").value = ""
    document.getElementById("txtFamilienaam").value = ""
    document.getElementById("txtGeboorteDatum").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtAantalKinderen").value =""
    document.getElementById("NummerInRij").value = personen.length
    document.getElementById("Nieuw").value = "true"
    clearAllErrors()

    // Zet de user interface klaar om de gegevens van een nieuwe persoon in te voeren
};

const bewerkPersoon = (item) =>{
    clearAllErrors()
    let persoon = JSON.parse(item)
    document.getElementById("txtVoornaam").value = persoon.Voornaam
    document.getElementById("txtFamilienaam").value = persoon.Achternaam
    document.getElementById("txtGeboorteDatum").value = persoon.Geboortedatum
    document.getElementById("txtEmail").value = persoon.Email
    document.getElementById("txtAantalKinderen").value = persoon.AantalKinderen
    document.getElementById("NummerInRij").value = persoon.NummerInRij
    document.getElementById("Nieuw").value = "false"

}


// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaar);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", nieuwPersoon);

    let lijst = document.getElementById("lstPersonen")
    lijst.addEventListener("change", () => {bewerkPersoon(lijst.value)})

    let nummerInRij = document.getElementById("NummerInRij")
    nummerInRij.style.visibility="hidden"
    nummerInRij.value = 0
    let nieuw = document.getElementById("Nieuw")
    nieuw.style.visibility="hidden"
    nieuw.value = "true"

    // voeg een change listener toe aan lstPersonen. Bij het klikken op een option element in de lijst
    // moet de data van die persoon getoond worden in het formulier
};

window.addEventListener("load", setup);