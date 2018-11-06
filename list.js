var listScript = (function() {

    var listObj = {};

	var url = "https://gateway.marvel.com:443/v1/public/characters";
	var apiKey = "6b487ccd0d59e614a6811de6da51f8a1"; 
    var httpRequest;
    let char;
    var index = 0;
    let i = 0;
    document.getElementById('btnRight').addEventListener("click", next);
    document.getElementById('btnLeft').addEventListener("click", previous);
    listRequest();

    // Generates next 15 entries of characters
    function next() { 
        let prevList = document.getElementById('charList');
        if (prevList !== null) {
            prevList.remove();
        }
        console.log(prevList);
        index += 15;
        listRequest(index);
        console.log(index);
        return index;
     };

     // Generates previous 15 entries of characters
     function previous() {
         if (index === 0) {
             return;
         }
        let prevList = document.getElementById('charList');
        if (prevList !== null) {
            prevList.remove();
        }
        console.log(prevList);
        index -= 15;
        listRequest(index);
        console.log(index);
        return index;
     }

	// create and send an XHR request
	function listRequest(num) {
		httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = responseMethod;
        if (num == 0) {
            httpRequest.open('GET', `${url}?limit=15&apikey=${apiKey}`);
            httpRequest.send();
        } else {
            httpRequest.open('GET', `${url}?limit=15&offset=${index}&apikey=${apiKey}`);
            httpRequest.send();    
        }
    }

	// handle XHR response
	function responseMethod() {
		if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                 return charList(httpRequest.responseText);
            } else {
                console.log("you took an L.");
                console.log(httpRequest.responseText, httpRequest.status);
            }
            
		}
    }

    function clickResponse() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                 return charInfo(httpRequest.responseText);
            } else {
                notFound();
                console.log(httpRequest.responseText, httpRequest.status);
            }
            
		}
    }
    

// List of Characters


function charList(responseText) {
    let ul = document.createElement("UL");
    ul.setAttribute("id", "charList");
    let divList = document.getElementById("divList");
    divList.appendChild(ul);
    let list = []
    let response = JSON.parse(responseText);
    let info = response.data.results;
    info.forEach(function(e) {
        list.push(e.name);
    });
    list.forEach(function(e) {
        i++;
        let list = document.getElementById('charList');
        let listItem = document.createElement("li");
        listItem.innerHTML = e;
        listItem.setAttribute("id", "listItem" + i);
        listItem.setAttribute("class", "item");
        list.appendChild(listItem);
        document.getElementById(`listItem${i}`).addEventListener("click", select);
    });

     function select() {
        char = this.innerHTML;
        console.log(char)
        mainScript.characterClick(char);
        mainScript.clickRequest(char);
    }
    
};
})();