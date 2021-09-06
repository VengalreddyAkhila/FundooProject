class App {
  constructor() {  
    this.notes = [];
    this.title = '';
    this.text = '';
    this.id = '';

    this.$placeholder = document.querySelector("#placeholder");
    this.$form = document.querySelector("#form");
    this.$notes = document.querySelector("#notes");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    this.$formCloseButton = document.querySelector("#form-close-button");    
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener("click", event => {
      //event => to get an event and pass it to the call back
      this.handleFormClick(event);
      // populates the modal with information contained on note
      this.selectNote(event);     
      //delete a note with trash icon
      this.deleteNote(event);
   
    });


    //EventListener to clear the form when submitted
    this.$form.addEventListener("closesubmit", event => {
      //to prevent the default event of refreshing when submitted add ev
      event.preventDefault();
      // get input from id = note-title and id = note-text
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      //conditional to make sure text in the title or text space
      const hasNote = title || text;
      if (hasNote) {
        // add note
        this.addNote({ title, text });
      }
    });

    // close form once note added
    this.$formCloseButton.addEventListener("click", event => {
      // allows form to close and over ride isFormClicked method
      event.stopPropagation();
      this.closeForm();
    });    
  }


  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);
    //check to see if user has clicked into the form
    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
      this.openForm();
    } else if (hasNote) {
      // if we have a note, add it to the board
      this.addNote({ title, text });
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add("form-open");
    this.$noteTitle.style.display = "block";
    this.$formButtons.style.display = "block";
  }

  closeForm() {
    this.$form.classList.remove("form-open");
    this.$noteTitle.style.display = "none";
    this.$formButtons.style.display = "none";
    // to clear the form before closing
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  } 

  addNote({ title, text }) {
    //add note data
    const newNote = {
      title,
      text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
    };
    // add new note to our array along with previous notes
    this.notes = [...this.notes, newNote];
    // display Notes on the screen
    this.render();
    // closes form after entering a note
    this.closeForm();
  }

  // populate the modal with title and text from selected note
  selectNote(event) {
    const $selectedNote = event.target.closest('.note');
    if (!$selectedNote) return;
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;
  }
  deleteNote(event) {
    event.stopPropagation();
    if (!event.target.matches('.toolbar-delete')) return;
    const id = event.target.dataset.id;
    this.notes = this.notes.filter(note => note.id !== Number(id));
    this.render();
  }
  render() {
    this.saveNotes();
    this.displayNotes();
  }

  //store note when we refresh
  saveNotes() {
    //JSON.stringify turns note into a string
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }


  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex';
    this.$notes.innerHTML = this.notes.map(note => `
        <div style="background: ${note.color};" class="note" data-id="${note.id}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar" style="display:flex; justify-content:space-between">      
              
              <button style="border:none;background:transparent"  onclick="trashNotes"><img class="toolbar-delete" data-id=${note.id} src="../Assests/more.svg"></button>
              <button style="border:none;background:transparent" onclick="displayArchive"><img class="toolbar-archive" data-id=${note.id} src="../Assests/archive.svg"></button>
              <button style="border:none;background:transparent"><img class="toolbar-image" data-id=${note.id} src="../Assests/image.svg"></button>
              <div id="color-palette-dropup" class="dropup" onclick="ColorInDisplay()">
              <button class="btn dropup-toggle" type="button" id="btn-colors"  data-bs-toggle="dropdown">
                  <i class="fas fa-palette fa-fw"></i>
              </button>
              <div class="color-palette dropdown-menu">
                  <div class="bg-white circled selected-color"></div>
                  <div class="bg-red"></div>
                  <div class="bg-orange"></div>
                  <div class="bg-yellow"></div>
                  <div class="bg-green"></div>
                  <div class="bg-turquoise"></div>
                  <div class="bg-blue"></div>
                  <div class="bg-dark-blue"></div>
                  <div class="bg-purple"></div>
                  <div class="bg-pink"></div>
                  <div class="bg-brown"></div>
                  <div class="bg-grey"></div>
              </div>
          </div>
              <button style="border:none;background:transparent"><img class="toolbar-people" data-id=${note.id} src="../Assests/people.svg"></button>
              <button style="border:none;background:transparent"><img class="toolbar-remainder" data-id=${note.id} src="../Assests/remainder.svg"></button>
            </div>
          </div>
        </div>
     `).join("");// adding .join("") will get rid of the commas between our arrays
  }
}

new App();
// function Archive() {
//   archive = !archive;
// }
// Archive();


// function addNote() {
//   let data = {
//     "title": document.getElementById("note-title").value,
//     "description": document.getElementById("note-text").value,
//     "isArchived": true,    
//     "color" : document.getElementById("form").style.backgroundColor
//   }
//   if (header = true)
//     makePromiseCall("POST", "http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", true, data)
//       .then((Response) => {
//         console.log(Response.data);
//       })
//       .catch()
//   console.log("error");
// }
// window.addEventListener('DOMContentLoaded', (event) => {
//   getNotes();
// });
// function getnote () {
//   let data={}
//   if(header = true)
//   makePromiseCall("GET","http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",true,data)
//   .then((Response) => {
//       console.log(JSON.parse(Response).data);         
//   })
//   .catch()
//   console.log("error");
// }



// function trashNotes() {
//   let data = {
//     "noteId": [note.id],
//     "isDeleted": true
//   }
//   if (header = true)
//     makePromiseCall("POST", "http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", true, data)
//       .then((res) => {
//         console.log(res.data);
//         getNotes();
//       })
//       .catch()
//   console.log("error");
// }







