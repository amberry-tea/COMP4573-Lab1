const notes = [];

// Text to show to user
const storedText = "stored at: ";
const removeButtonText = "Remove";

function Note(text, element) {
    this.text = text;
    this.element = element;
}

function removeNote(source){
    const index = parseInt(source.parentNode.id.substring(4));
    
    // Remove this note from the notes
    //console.log("Removing note number " + index + " from :\n" + notes);
    notes.splice(index, 1);
    //console.log("Note " + index + " removed! Result :\n" + notes);

    // Remove this note
    source.parentNode.remove();

    // Rename the other notes IDs to replace them with an index that is one lower (to preserve order)
    for(let i = index + 1; i < notes.length + 1; i++){
        document.getElementById("note"+i).id = "note"+(i-1);
    }
}

function addNote(){
    index = notes.length;

    // Add a new element to the document for the note
    let notesDiv = document.getElementById("notes");

    let note = document.createElement("div");
    note.setAttribute("id", "note"+(index));

    let noteOuter = document.createElement("div");
    noteOuter.setAttribute("class", "noteOuter");
    note.appendChild(noteOuter);

    let noteInner = document.createElement("textArea");
    noteInner.setAttribute("class", "noteInner");
    noteOuter.appendChild(noteInner);

    let button = document.createElement("button");
    button.setAttribute("class", "remove");
    button.setAttribute("onclick", "removeNote(this);");
    button.innerHTML = removeButtonText;
    note.appendChild(button);

    notesDiv.appendChild(note);

    // Add a new element to the notes array
    notes.push(new Note("", note));


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
    // Add the text from each text area to their note object
    for(let i = 0; i < notes.length; i++){
        notes[i].text = notes[i].element.children[0].children[0].value;
    }

    // console.log(notes);

    // Update the local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Set the "stored at" text to display the current time
    document.getElementById("timestampSpan").innerHTML = storedText + new Date().toLocaleTimeString();
}

// Run the update of local cache every two seconds
window.setInterval(updateLocalStorage, 2000);