const invalidInputMessage = "Invalid input! Ensure input is only letters and spaces.";
const serverQueryUrl = "http://unknownmorph.com/COMP4537/labs/4/api/definitions?word=";
const termText = "Term: ";
const definitionText = "</br>Definition: ";
const requestsText = "</br>Requests: ";

function search(source){
    searchTerm = document.getElementById("input-word").value;
    resultTextElement = document.getElementById("inner-results");
    
    if(/[^a-zA-Z ]/.test(searchTerm)){ // Ensure input is only letters and spaces
        console.log("Bad input!");

        resultTextElement.value = invalidInputMessage;
    } else {
        console.log("Good input!");

        searchTerm = searchTerm.trim();

        url = serverQueryUrl + searchTerm;

        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true); //True param for async
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4){ //Validate that the response is okay
                console.log(xhttp.responseText);
                json = JSON.parse(xhttp.responseText)
                definition = json.definition;
                term = json.term;
                requests = json.requests;
                if(xhttp.status == 200){
                    resultTextElement.innerHTML = termText + term + definitionText + definition + requestsText + requests;
                } else {
                    responseText = JSON.parse(xhttp.responseText).message;
                    resultTextElement.innerHTML = responseText + requestsText + requests;
                }
            } else {
                console.log("readyState = " + this.readyState + "\nstate = " + this.state);
            }
        };

    }
}