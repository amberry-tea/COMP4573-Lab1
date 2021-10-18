const serverQueryUrl = "http://unknownmorph.com/COMP4537/labs/4/api/definitions/";
const sendingMessageText = "Sending new definiton to the server...";
const recievedMessageText = "New definition added!";

function store(source) {
    searchTerm = document.getElementById("input-textarea").value;
    resultTextElement = document.getElementById("inner-results");

    if (/[^a-zA-Z ]/.test(searchTerm)) { // Ensure input is only letters and spaces
        console.log("Bad input!");

        resultTextElement.value = invalidInputMessage;
    } else {
        console.log("Good input!");
        resultTextElement.value = sendingMessageText;

        searchTerm = searchTerm.trim();

        url = serverQueryUrl;
        // params = {
        //     'word': 'Book',
        //     'definition': 'A written or printed work consisting of pages glued or sewn together'
        // };
        params = "?word=book&definition=A written or printed work consisting of pages glued or sewn together"

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.send(params); //params in the body
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) { //Validate the resonse is okay
                console.log(this);
                resultTextElement.value = recievedMessageText;
            } else {
                console.log("readyState = " + this.readyState + "\nstate = " + this.state)
            }
        };


    }
}