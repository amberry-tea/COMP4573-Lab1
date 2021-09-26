var notes = [];

function removeNote(source){
    let index = parseInt(source.parentNode.id.substring(4));
    
    // Remove this note from the ntoes
    console.log("Removing note number " + index + " from :\n" + notes);
    notes.splice(index, 1);
    console.log("Note " + index + " removed! Result :\n" + notes);

    // Remove this note
    source.parentNode.remove();

    // Rename the other notes IDs to replace them with an index that is one lower (to preserve order)
    for(var i = index; i < notes.length + 1; i++){
        document.getElementById("note"+i).id = "note"+(i-1);
    }
}

function addNote(){
    // Add a new element to the notes array
    notes.push("");

    // Add a new element to the document for the note
    notesDiv = document.getElementById("notes");
    notesDiv.innerHTML += 
        `
        <div id="note` + (notes.length - 1) + `">
            <div class="noteOuter">
                <textarea class="noteInner">
                </textarea>
            </div>
            <button class="remove" onclick="removeNote(this);">Remove</button>
            </br>
        </div>
        `;
}

function updateLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Run the update of local cache every two seconds
window.setInterval(updateLocalStorage(), 2000);