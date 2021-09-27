function retrieveLocalStorage(){
    let notesJSON = localStorage.getItem("notes");
    let notes = JSON.parse(notesJSON);
    console.log(notes);

    displayNotes(notes);

    // Set the "stored at" text to display the current time
    document.getElementById("timestampSpan").innerHTML = "retrieved at: " + new Date().toLocaleTimeString();
}

function displayNotes(notes){
    let notesDiv = document.getElementById("notes");

    // Clear the current notes
    notesDiv.innerHTML = "";

    // Add each note
    notes.forEach(note => addNote(note.text));
}

function addNote(text){{
    let notesDiv = document.getElementById("notes");

    let note = document.createElement("div");

    let noteOuter = document.createElement("div");
    noteOuter.setAttribute("class", "noteOuter");
    note.appendChild(noteOuter);

    let noteInner = document.createElement("p");
    noteInner.setAttribute("class", "noteInner");
    noteOuter.appendChild(noteInner);
    noteInner.innerHTML = text;

    notesDiv.appendChild(note);
}}

// Run the update of local cache every two seconds
window.setInterval(retrieveLocalStorage, 2000);