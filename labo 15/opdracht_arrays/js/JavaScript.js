const setup = () => {
}
window.addEventListener("load", setup);

const familieArray = ['Geert','Stefanie','Sam','Emma','Amika']
console.log(familieArray[0])
console.log(familieArray[2])
console.log(familieArray[4])
function  VoegNaamToe(naam)
{
    if(naam ==="")
    {
        naam = prompt("Wat is je naam?")
    }
    familieArray.push(naam)
    console.log(naam)
}
VoegNaamToe()
console.log(familieArray.join())



