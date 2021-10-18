const serverQueryUrl = "http://unknownmorph.com/COMP4537/labs/4/api/definitions/";
const sendingMessageText = "Sending new definiton to the server...";
const successMessageText = "New definition added!";
// const preExistingDefinitionMessageText = "Definition is already in the dictionary!";
const badInputMessageText = "Word must only contain characters within A-Z, a-z and spaces!";
const emptyInputMessageText = "Enter a word and definition!";

function store(source) {
    newWord = document.getElementById("input-word").value;
    newDefinition = document.getElementById("input-definition").value;

    resultTextElement = document.getElementById("inner-results");

    if (!newWord || !newDefinition){
        console.log("Bad input!");

        resultTextElement.innerHTML = emptyInputMessageText;
    } else if (/[^a-zA-Z ]/.test(newWord)) { // Ensure input is only letters and spaces
        console.log("Bad input!");

        resultTextElement.innerHTML = badInputMessageText;
    } else  {
        console.log("Good input!");
        resultTextElement.innerHTML = sendingMessageText;

        newWord = newWord.trim();

        url = serverQueryUrl;
        params = {
            'word': newWord,
            'definition': newDefinition
        };

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) { //Validate the resonse is okay
                console.log(xhttp.responseText);
                responseText = JSON.parse(xhttp.responseText).message;
                if(xhttp.status == 200){
                    resultTextElement.innerHTML = successMessageText;
                } else {
                    resultTextElement.innerHTML = responseText;
                }
            } else {
                console.log("readyState = " + this.readyState + "\nstate = " + this.state);
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'text/plain');
        xhttp.send(JSON.stringify(params)); //params in the body
    }
}