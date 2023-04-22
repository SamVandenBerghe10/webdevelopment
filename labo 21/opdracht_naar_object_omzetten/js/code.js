const setup = () => {
    let test = '{"School":"Vives","Campus":"Kortrijk","Voornaam":"Sam","Achternaam":"Vanden berghe","Adres":{"Straat":"Nijverheidstraat","Nummer":24,"Gemeente":"Oostrozebeke","Provincie":"West-Vlaanderen","Land":"België"},"Richting":"Toegepaste Informatica","Vakken":["Business management","Problem solving","Power BI","Databases","Introduction to artificial intelligence","Fundamentals of programming","Computer networking","Web Development","System management"],"DatumInschrijving":"Wed Apr 19 2023 11:35:29 GMT+0200 (Central European Summer Time)"}'
    console.log(JSON.parse(test))
}
window.addEventListener("load", setup);