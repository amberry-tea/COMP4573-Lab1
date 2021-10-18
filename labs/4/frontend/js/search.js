const invalidInputMessage = "Invalid input! Ensure input is only letters and spaces.";
const serverQueryUrl = "http://unknownmorph.com/COMP4537/labs/4/api/definitions?word="

function search(source){
    searchTerm = document.getElementById("input-textarea").value;
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
                //resultTextElement.value = 
                console.log(this);
            } else {
                console.log("readyState = " + this.readyState + "\nstate = " + this.state)
            }
        };

    }
}