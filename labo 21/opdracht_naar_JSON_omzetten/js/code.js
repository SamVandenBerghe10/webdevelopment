const setup = () => {
    let student1 = {
        School: "Vives",
        Campus: "Kortrijk",
        Voornaam: "Sam",
        Achternaam: "Vanden berghe",
        Adres: {
            Straat: "Nijverheidstraat",
            Nummer: 24,
            Gemeente: "Oostrozebeke",
            Provincie: "West-Vlaanderen",
            Land: "België"
        },
        Richting: "Toegepaste Informatica",
        Vakken:["Business management","Problem solving","Power BI", "Databases", "Introduction to artificial intelligence", "Fundamentals of programming", "Computer networking", "Web Development", "System management"],
        DatumInschrijving: Date("08/15/2022")
    }
    let test = JSON.stringify(student1)
    console.log(test)
}
window.addEventListener("load", setup);