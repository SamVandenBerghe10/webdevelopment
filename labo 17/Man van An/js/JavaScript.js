const setup = () => {
    let woord = "De man van An geeft geen hand aan ambetante verwanten";
    let counter = 0;
    for (let i = 0; i < woord.length; i++) {
        if(woord.charAt(i) === 'a')
        {
            if(woord.charAt(i+1))
            {
                counter++;
                i++;
            }
        }
    }
    let output = document.getElementById('output')
    output.innerHTML = counter
}
window.addEventListener("load", setup);