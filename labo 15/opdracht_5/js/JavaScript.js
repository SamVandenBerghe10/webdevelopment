const setup = () => {
    WijzigKnop.addEventListener("click", wijzig)
}
window.addEventListener("load", setup);

const wijzig = () =>
{
    let pElement=document.getElementById("txtOutput");
    pElement.innerHTML="Welkom!";
}