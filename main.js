var mainScript = (function() {

    var that = {};

	var url = "https://gateway.marvel.com:443/v1/public/characters";
	var apiKey = "6b487ccd0d59e614a6811de6da51f8a1"; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
    var httpRequest;
    var newChar = document.getElementById('search');
    document.getElementById('submit').addEventListener("click", charRequest);
    document.addEventListener("keydown", function(e) {
        console.log(e.keyCode)
        if (e.keyCode === 13) {
            charRequest();
        } 
    });

        // Update Character (search)
    function characterSelect() {
        let search = document.getElementById('search').value;
        return `?name=${search}`;
    };

    // Update Character (click)
    var characterClick = that.characterClick = function(x) {
        return `?name=${x}`;
    }

    var clickRequest = that.clickRequest = function(x) {
		httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = responseMethod;
        console.log(url + characterClick() + "&" + 'apikey=' + apiKey)
		httpRequest.open('GET', url + characterClick(x) + "&" + 'apikey=' + apiKey);
		httpRequest.send();
    }

	// // create and send an XHR request
	   function charRequest() {
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = responseMethod;
		httpRequest.open('GET', url + characterSelect() + "&" + 'apikey=' + apiKey);
		httpRequest.send();
    }

	// handle XHR response
	function responseMethod() {
		if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                 return charInfo(httpRequest.responseText);
            } else {
                notFound();
                console.log(httpRequest.responseText, httpRequest.status);
            }
            
		}
    }
    
 
// Pull Character Information / Builds Characther Card
function charInfo(responseText) {
    var response = JSON.parse(responseText);
    console.log(response);
    let info = response.data.results[0];
    console.log(info);
    let card = document.getElementById("charCard");
    card.style.visibility === "hidden";
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');
    let lastModified = document.getElementById('last-modified');
    let img = document.getElementById('hero-image');
    title.innerHTML = info.name;
    desc.innerHTML = "Description: " + info.description;
    lastModified.innerHTML = `Last modified: ${info.modified}`;
    img.src = info.thumbnail.path + '.' + info.thumbnail.extension;
};



// Error Message If Characther Is Not Found
function notFound() {
let card = document.getElementById("charCard");
while (card.firstChild) {
    card.removeChild(card.firstChild);
}
let a = document.createElement("h1");
a.innerHTML = "NOT FOUND.";
let err = document.getElementById("errorMessage");
return err.appendChild(a);
}
return that;
})();