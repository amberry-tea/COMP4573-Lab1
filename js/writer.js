var notes = [];

function removeNote(source){
    index = parseInt(source.parentNode.id.substring(4));
    
    // Remove this note from the ntoes
    console.log("Removing note number " + index + " from :\n" + notes);
    notes.splice(index, 1);
    console.log("Note " + index + " removed! Result :\n" + notes);

    // Remove this note
    source.parentNode.remove();

    // Rename the other notes IDs to replace them with an index that is one lower (to preserve order)
    for(var i = index + 1; i < notes.length + 1; i++){
        document.getElementById("note"+i).id = "note"+(i-1);
    }
}

function addNote(){
    // Add a new element to the notes array
    notes.push("");

    // Add a new element to the document for the note
    notesDiv = document.getElementById("notes");

    note = document.createElement("div");
    note.setAttribute("id", "note"+(notes.length-1));

    noteOuter = document.createElement("div");
    noteOuter.setAttribute("class", "noteOuter");
    note.appendChild(noteOuter);

    noteInner = document.createElement("textArea");
    noteInner.setAttribute("class", "noteInner");
    noteOuter.appendChild(noteInner);

    button = document.createElement("button");
    button.setAttribute("class", "remove");
    button.setAttribute("onclick", "removeNote(this);");
    button.innerHTML = "Remove";
    note.appendChild(button);

    notesDiv.appendChild(note);


    // notesDiv.innerHTML += 
    //     `
    //     <div id="note` + (notes.length-1) + `">
    //         <div class="noteOuter">
    //             <textarea class="noteInner">
    //             </textarea>
    //         </div>
    //         <button class="remove" onclick="removeNote(this);">Remove</button>
    //         </br>
    //     </div>
    //     `;
}

function updateLocalStorage(){
    console.log("Update!");
    for(i = 0; document.getElementById("note" + i) != null; i++){
        notes[i] = document.getElementById("note" + i).children[0].children[0].value;
    }

    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Set the "stored at" text to display the current time
    document.getElementById("timestampSpan").innerHTML = "stored at: " + new Date().toLocaleTimeString();
}

// Run the update of local cache every two seconds
window.setInterval(updateLocalStorage, 2000);