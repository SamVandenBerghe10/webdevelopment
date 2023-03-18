const setup = () => {
	let btnValideer=document.getElementById("btnValideer");
	btnValideer.addEventListener("click", valideer);
};

const valideer = () => {
	valideerVoornaam();
	valideerAchternaam()
	valideerDate()
	valideerEmail()
	valideerAantalKinderen()
	if(valideerVoornaam() && valideerAchternaam() && valideerDate() && valideerEmail() && valideerAantalKinderen())
	{
		window.alert("proficiat!")
	}
};

const valideerVoornaam = () => {
	let txtVoornaam = document.getElementById("txtVoornaam");
	let errVoornaam = document.getElementById("errVoornaam");
	let voornaam = txtVoornaam.value.trim();
	if (voornaam.length > 30) {
		txtVoornaam.className="invalid"; // invalid class instellen
		errVoornaam.innerHTML = "max. 30 karakters";
	} else {
		txtVoornaam.className=""; // alle classes verwijderen
		errVoornaam.innerHTML = "";
		return true
	}
};

const valideerAchternaam = () => {
	let txtAchternaam = document.getElementById("txtAchternaam")
	let errAchternaam = document.getElementById("errAchternaam")
	let achternaam = txtAchternaam.value.trim();
	if (achternaam.length > 50) {
		txtAchternaam.className = "invalid"
		errAchternaam.innerHTML = "max 50 karakters"
	} else if (achternaam === "") {
		txtAchternaam.className = "invalid"
		errAchternaam.innerHTML = "verplicht veld"
	} else
	{
		txtAchternaam.className=""
		errAchternaam.innerHTML= ""
		return true
	}
}

const valideerDate = () =>
{
	let txtDate = document.getElementById("txtDate")
	let errDate = document.getElementById("errDate")
	let date = txtDate.value.trim()
	if(date === "")
	{
		txtDate.className = "invalid"
		errDate.innerHTML ="verplicht veld"
	}
	else if(date.length !== 10 || !/^[0-9]+$/.test(date.substring(0, 4)) || date.substring(4,5) !== "-" || !/^[0-9]+$/.test(date.substring(5, 7)) || date.substring(7,8) !== "-" || !/^[0-9]+$/.test(date.substring(8,10)))
	{
		txtDate.className ="invalid"
		errDate.innerHTML = "formaat is niet jjjj-mm-dd"
	}
	else
	{
		txtDate.className =""
		errDate.innerHTML=""
		return true
	}
}

const valideerEmail = () =>
{
	let txtEmail = document.getElementById("txtEmail")
	let errEmail = document.getElementById("errEmail")
	let email = txtEmail.value.trim()
	if(email === "")
	{
		txtEmail.className = "invalid"
		errEmail.innerHTML ="verplicht veld"
	}
	else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
	{
		txtEmail.className="invalid"
		errEmail.innerHTML ="geen geldig email adres"
	}
	else
	{
		txtEmail.className=""
		errEmail.innerHTML = ""
		return true
	}
}

const valideerAantalKinderen = () =>
{
	let txtAantalKinderen = document.getElementById("txtAantalKinderen")
	let errAantalKinderen = document.getElementById("errAantalKinderen")
	let aantalKinderen = txtAantalKinderen.value.trim();
	if(!/^[0-9]+$/.test(aantalKinderen))
	{
		txtAantalKinderen.className="invalid"
		errAantalKinderen.innerHTML="is geen positief getal"
	}
	else if(aantalKinderen < 0)
	{
		txtAantalKinderen.className="invalid"
		errAantalKinderen.innerHTML="is geen positief getal"
	}
	else if(aantalKinderen > 98)
	{
		txtAantalKinderen.className="invalid"
		errAantalKinderen.innerHTML="is te vruchtbaar"
	}
	else
	{
		txtAantalKinderen.className = ""
		errAantalKinderen.innerHTML = ""
		return true
	}
}

window.addEventListener("load", setup);