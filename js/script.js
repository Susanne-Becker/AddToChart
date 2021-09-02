// bron: https://www.w3schools.com/jsref/met_win_settimeout.asp;
// bron: https://www.w3schools.com/jsref/met_element_remove.asp;
// bron: https://stackoverflow.com/questions/4777077/removing-elements-by-class-name;
// bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList;
// bron: https://stackoverflow.com/questions/14617221/need-to-convert-result-of-innerhtml-to-number-on-javascript;
// bron: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON;
// bron: https://stackoverflow.com/questions/36643811/css-toggle-accordion-panel;
// bron: https://alligator.io/js/classlist/;
// bron: https://stackoverflow.com/questions/22270664/how-to-remove-a-class-from-elements-in-pure-javascript;

/*Variabele aan main meegeven*/
var main = document.querySelector('main');

//We slaan de URL van de JSON die we willen ophalen op in een variabele
var requestURL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';
//Een verzoek aanvragen
var request = new XMLHttpRequest();
//Nu moeten we het verzoek openen met behulp van de open()methode, informatie krjgen via GET
request.open('GET', requestURL);
//bestandstype kiezen
request.responseType = 'json';
//verzoek versturen
request.send();

//Wachten op de server en dan aangeven wat hij moet doen wanneer de pagina geladen is.
request.onload = function () {
	// loadings state
	setTimeout(function () {
		// wanneer laden klaar is (na 2 sec), voor deze functie uit (staat hieronder)
		Array.from(document.getElementsByClassName("invisible")).forEach((removeElement) => {
			removeElement.classList.remove("invisible");
		});
		//De class remove toevoegen, waardoor de loading state na het laden verdwijnt
		document.querySelector(".loading").classList.add("invisible");
		//aangeven wat hij na het laden moet laten zien (functie htmlMakeup staat hieronder)
		htmlMakeup(request.response);
		//aangeven hoelang hij moet laden
	}, 2000); //Na 2 seconden gebeurt het bovenstaande, in de functie setTimeout
	//json bestand hernoemen
	const alleMakeup = request.response;
	//in console alle make up laten tonen
	console.log(alleMakeup);
}



function htmlMakeup(jsonObj) {
	const item = jsonObj;
	//door de json loopen
	for (let i = 0; i < item.length; i++) {
		//maak een section aan
		var section = document.createElement('section');
		section.classList.add("section");
		//maak een h1 aan , geef de text de waarde van product_type
		var titel = document.createElement('h3');
		titel.textContent = item[i].product_type;
		//maak een img aan, img src is image_link
		var img = document.createElement('img');
		img.src = item[i].image_link;
		//maak button aan, tekst is 'add to card', class is save
		var button = document.createElement('button');
		button.textContent = "Add to cart";
		button.classList.add("save");
		//maak een article aan, text is 'description: ' + de waarde van description, class is show
		var description = document.createElement('article');
		description.textContent = "Description: " + item[i].description;
		description.classList.add("information");
		//maak een article aan, text is brand: + de waarde van brand in de API, class is show
		var brand = document.createElement('article');
		brand.textContent = "Brand: " + item[i].brand;
		brand.classList.add("information");
		//maak een article aan, text is 'price: ' + de waarde van price, class is show
		var price = document.createElement('article');
		price.textContent = "Price: " + item[i].price;
		price.classList.add("information");

		//zet de titel, button, img en beschrijving in de section
		section.appendChild(titel);
		section.appendChild(button);
		section.appendChild(img);
		section.appendChild(description);
		section.appendChild(brand);
		section.appendChild(price);
		//zet de section in de main, de main staat al in html
		main.appendChild(section);
	}

	//button aanroepen
	var button = document.querySelectorAll(".save");

	//als er op een button wordt geklikt, dan naar functie geklikt
	button.forEach(function (btn) {
		btn.addEventListener('click', click);
	});

	//teller aanroepen. als de class save is, dan naar class saved en +1 bij teller (parseInt retourt geheel getal), anders van .saved naar .save en -1 in teller
	function click() {
		var counter = document.querySelector('li a span');

		if (this.classList.contains('save')) {
			this.classList.remove('save');
			this.classList.add('saved');
			counter.innerHTML = parseInt(counter.innerHTML) + 1;
		} else {
			this.classList.remove('saved');
			this.classList.add('save');
			counter.innerHTML = parseInt(counter.innerHTML) - 1;
		}
	}
}

// Keyboard event

//eerste afbeelding is begin
var j = 0;

//keydown event, dus een knop wordt ingedrukt
window.addEventListener("keydown", keyboard);

function keyboard(event) {
	if (event.key == "ArrowRight") { //als arrowright wordt ingedrukt, dan i++, dus volgende afbeelding. als i groter is dan de lengte van alle afbeeldingen blijft hij stil staan.
		j++;
	} else if (event.key == "ArrowLeft") { //als arrowleft wordt ingedrukt, dan i--, dus vorige afbeelding. als i kleiner is dan 0 blijft hij stil staan.
		j--;
	}
}