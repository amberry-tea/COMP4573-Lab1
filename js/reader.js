var notes = [];

function retrieveLocalStorage(){
    notesJSON = localStorage.getItem("notes");
    notes =  JSON.parse(notesJSON);
}

// Run the update of local cache every two seconds
window.setInterval(updateLocalStorage(), 2000);