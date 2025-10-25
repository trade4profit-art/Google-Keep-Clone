const notes_div = document.querySelectorAll('.notes');
const h3s = document.querySelectorAll('h3');
const contentIcons = document.querySelectorAll(`#content-icon`);
const takeNote = document.querySelector(`.take-note`);
const makeNote = document.querySelector(`.make-note`);
const closeBtn = document.querySelector(`.close-btn`);
const listBtn = document.querySelector(`.list-btn`);
const userNotes = document.querySelector(`.user-notes`);
const listIcon = document.querySelector('.list-icon');
const noteTitle = document.querySelector(`.input-title`);
const noteBody = document.querySelector(`.body-note`);
const modal = document.querySelector('.full-note-modal');
const titleDiv = modal.querySelector('.modal-title');
const bodyDiv = modal.querySelector('.modal-body');
const modalCloseBtn = document.querySelector(`.modal-close-btn`);
const backdrop = document.querySelector('.modal-backdrop');
const notes = document.querySelectorAll(`.note`);
const priDiv = document.querySelector('.pri-div');
const moreBtn = document.querySelector(`.more-btn`);
const moreOption = document.querySelector(`.more-option`);
const deleteBtn = document.querySelector(`.delete-btn`);
const para = document.querySelector('.note-body p');

let moreOPtionAction = ()=>{

const notesContainer = document.querySelector('.user-notes');

  notesContainer.addEventListener('click', (event) => {
    const note = event.target.closest('.note');
    if (!note) return;
    notes.forEach(note => {
      const moreBtnNote = note.querySelector('.more-btn');
      if (moreBtnNote) {
        moreBtnNote.addEventListener('click', () => {
          moreOption.classList.remove('hidden');
          currentEditingNote = note;
        });
      }
    });
  });


  document.addEventListener('mousedown', (event) => {
    if (!moreOption.classList.contains('hidden') && !moreOption.contains(event.target)) {
      moreOption.classList.add('hidden');
    };
  });

  deleteBtn.addEventListener('click', () => {
    if (currentEditingNote) {
      currentEditingNote.classList.add('fade-out');
      moreOption.classList.add('hidden');

      const noteToDelete = currentEditingNote;

      // Wait for the CSS transition to finish
      noteToDelete.addEventListener('transitionend', function handler() {
        if (noteToDelete.parentNode) {
          noteToDelete.parentNode.removeChild(noteToDelete);
        }
        currentEditingNote = null;
        console.log("deleted");
        // Remove the event listener to avoid memory leaks
        noteToDelete.removeEventListener('transitionend', handler);
      });
    }
  modal.classList.add(`hidden`);
  backdrop.classList.remove(`show`);
  backdrop.classList.add(`hidden`);
  });
  console.log(123);
};

moreBtn.addEventListener(`click`,()=>{
  moreOption.classList.toggle(`hidden`);
  moreOPtionAction();
});


function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };
  return text.replace(/[&<>"'`]/g, m => map[m]);
};

function createNote() {

  if(
    (noteTitle.value && noteTitle.value.trim().length > 0) ||
    (noteBody.value && noteBody.value.trim().length > 0)
  ) {
    const newNote = document.createElement('div');
    // const safeBody = noteBody.value.replace(/\n/g, '<br>');
    const safeBody = escapeHtml(noteBody.value).replace(/\n/g, '<br>');
    newNote.className = 'note';
    newNote.innerHTML = `<div class="note-title"><h3>${escapeHtml(noteTitle.value.trim())}</h3></div><div class="note-body"><p>${safeBody}</p></div>`;

    userNotes.insertBefore(newNote, userNotes.firstChild);
    newNote.addEventListener('click', function() {
    const noteTitleText = this.querySelector('.note-title h3')?.textContent || "";
    const noteBodyText = this.querySelector('.note-body')?.textContent || "";
    showFullNoteModal(noteTitleText, noteBodyText,this);
    });
    noteTitle.value = "";
    noteBody.value = "";
    noteTitle.style.height = "auto";
    noteBody.style.height = "auto";
  } else {
    console.log('empty');
  }
};

const closeMakeNote = () => {
  document.addEventListener('mousedown', (event) => {
    if (!makeNote.classList.contains('hidden') && !makeNote.contains(event.target)) {
      makeNote.classList.add('hidden');
      takeNote.classList.remove('hidden');
      createNote();
    }
  });
};

closeMakeNote();

listBtn.addEventListener('click', ()=>{
  userNotes.classList.toggle('list');
  if(!userNotes.classList.contains('list')){
    listIcon.src = 'https://www.gstatic.com/keep/list_view_24px.svg'; 
  }
else {
    listIcon.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMywzIEwxMCwzIEMxMC41NSwzIDExLDMuNDUgMTEsNCBMMTEsMTAgQzExLDEwLjU1IDEwLjU1LDExIDEwLDExIEwzLDExIEMyLjQ1LDExIDIsMTAuNTUgMiwxMCBMMiw0IEMyLDMuNDUgMi40NSwzIDMsMyBaIE0zLDEzIEwxMCwxMyBDMTAuNTUsMTMgMTEsMTMuNDUgMTEsMTQgTDExLDIwIEMxMSwyMC41NSAxMC41NSwyMSAxMCwyMSBMMywyMSBDMi40NSwyMSAyLDIwLjU1IDIsMjAgTDIsMTQgQzIsMTMuNDUgMi40NSwxMyAzLDEzIFogTTE0LDMgTDIxLDMgQzIxLjU1LDMgMjIsMy40NSAyMiw0IEwyMiwxMCBDMjIsMTAuNTUgMjEuNTUsMTEgMjEsMTEgTDE0LDExIEMxMy40NSwxMSAxMywxMC41NSAxMywxMCBMMTMsNCBDMTMsMy40NSAxMy40NSwzIDE0LDMgWiBNMTQsMTMgTDIxLDEzIEMyMS41NSwxMyAyMiwxMy40NSAyMiwxNCBMMjIsMjAgQzIyLDIwLjU1IDIxLjU1LDIxIDIxLDIxIEwxNCwyMSBDMTMuNDUsMjEgMTMsMjAuNTUgMTMsMjAgTDEzLDE0IEMxMywxMy40NSAxMy40NSwxMyAxNCwxMyBaIE05LDkgTDksNSBMNCw1IEw0LDkgTDksOSBaIE05LDE5IEw5LDE1IEw0LDE1IEw0LDE5IEw5LDE5IFogTTIwLDkgTDIwLDUgTDE1LDUgTDE1LDkgTDIwLDkgWiBNMjAsMTkgTDIwLDE1IEwxNSwxNSBMMTUsMTkgTDIwLDE5IFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJncmlkX3ZpZXdfMjRweCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9ImJvdW5kcyIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjAgMCAyNCAwIDI0IDI0IDAgMjQiPjwvcG9seWdvbj4KICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgPC9tYXNrPgogICAgICAgIDx1c2UgaWQ9Imljb24iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICA8L2c+Cjwvc3ZnPgo=`;
  }
});

takeNote.addEventListener('click', () => {
    takeNote.classList.add('hidden');
    makeNote.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    makeNote.classList.add('hidden');
    takeNote.classList.remove('hidden');
});

document.querySelectorAll('textarea').forEach(el => {
  el.addEventListener('input', function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

if (priDiv) {
  priDiv.style.backgroundColor = "#41331c";
  const priIcon = priDiv.querySelector('#content-icon');
  const priText = priDiv.querySelector('.text-note h3');
  if (priIcon) priIcon.style.fill = "white";
  if (priText) priText.style.color = "white";
}
notes_div.forEach(el => {
  el.addEventListener('click', () => {
    notes_div.forEach(note =>
        note.style.backgroundColor = ""
    );
    el.style.backgroundColor = "#41331c";
    h3s.forEach(h => 
        h.style.color = ""
    );
    contentIcons.forEach(icon=>
        icon.style.fill=""
    );
    let cIcon = el.querySelector(`.icon`).querySelector(`#content-icon`);
    let cText = el.querySelector('.text-note').querySelector(`h3`);
    if (cText && cIcon) {
        cIcon.style.fill=`white`;
        cText.style.color="white";
    }
  });
});

document.querySelectorAll('.note').forEach(note => {
  note.addEventListener('click', function () {
    const noteTitleText = this.querySelector('.note-title h3')?.textContent || "";
    const noteBodyText = this.querySelector('.note-body p')?.textContent || "";

    const modalTitle = document.querySelector('.full-note-modal .modal-title');
    const modalBody = document.querySelector('.full-note-modal .modal-body');

    modalTitle.innerHTML = ''; // clear previous content
    modalBody.innerHTML = '';

    const titleTextarea = document.createElement('textarea');
    titleTextarea.value = noteTitleText;
    modalTitle.appendChild(titleTextarea);

    const bodyTextarea = document.createElement('textarea');
    bodyTextarea.value = noteBodyText;
    modalBody.appendChild(bodyTextarea);

    // document.querySelector('.full-note-modal').style.display = "flex";

    // Optionally, trigger auto-resize or other initialization here
  });
});


let currentEditingNote = null;

// function showFullNoteModal(title, body, noteElement) {

//   currentEditingNote = noteElement;
//   backdrop.classList.add('show');
//   backdrop.classList.remove('hidden');
//   modal.classList.add('show');
//   modal.classList.remove('hidden');
//   titleDiv.innerHTML = '';
//   bodyDiv.innerHTML = '';
//   modal.style.cssText = ''; 


//   const titleTextarea = document.createElement('textarea');
//   titleTextarea.value = title || '';
//   titleDiv.appendChild(titleTextarea);
  
//   const bodyTextarea = document.createElement('textarea');
//   bodyTextarea.value = body || '';
//   bodyDiv.appendChild(bodyTextarea);

//   // Show modal
//   modal.style.display = "flex";

//   // Auto-resize
//   [titleTextarea, bodyTextarea].forEach(textarea => {
//     textarea.style.height = 'auto';
//     textarea.style.height = textarea.scrollHeight + 'px';
//     textarea.addEventListener('input', function() {
//       this.style.height = 'auto';
//       this.style.height = this.scrollHeight + 'px';
//     });
//   });
// if (noteElement) {
//   const noteTitlePreview = noteElement.querySelector('.note-title h3');
//   const noteBodyPreview = noteElement.querySelector('.note-body');
//   if (noteTitlePreview) noteTitlePreview.textContent = titleTextarea.value;
//   if (noteBodyPreview) noteBodyPreview.textContent = bodyTextarea.value;
//   console.log(noteTitlePreview.textContent, bodyTextarea.value);
// }
// };

function showFullNoteModal(title, body, noteElement) {
  currentEditingNote = noteElement;

  // Show backdrop and modal
  backdrop.classList.add('show');
  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');
  modal.classList.add('show');

  // Clear previous content
  titleDiv.innerHTML = '';
  bodyDiv.innerHTML = '';
  // modal.style.cssText = ''; // optional, or remove

  // Create and append textareas
  const titleTextarea = document.createElement('textarea');
  titleTextarea.value = title || '';
  titleDiv.appendChild(titleTextarea);

  const bodyTextarea = document.createElement('textarea');
  bodyTextarea.value = body || '';
  bodyDiv.appendChild(bodyTextarea);

  // Optional if `.show` doesn’t handle display
  // modal.style.display = "flex";

  // Auto-resize + live preview
  [titleTextarea, bodyTextarea].forEach(textarea => {
    // textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.addEventListener('input', function () {
      // this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });


if (noteElement) {
  const noteTitlePreview = noteElement.querySelector('.note-title h3');
  let noteBodyPreview = noteElement.querySelector('.note-body p');

  // Ensure body has a <p> tag
  if (!noteBodyPreview) {
    noteBodyPreview = document.createElement('p');
    const bodyContainer = noteElement.querySelector('.note-body');
    bodyContainer.innerHTML = ''; // Clear raw text
    bodyContainer.appendChild(noteBodyPreview);
  }

  // Initial preview update
  if (noteTitlePreview) noteTitlePreview.textContent = titleTextarea.value;
  if (noteBodyPreview) noteBodyPreview.textContent = bodyTextarea.value;

  // Live preview on input
  titleTextarea.addEventListener('input', () => {
    if (noteTitlePreview) noteTitlePreview.textContent = titleTextarea.value;
  });
  bodyTextarea.addEventListener('input', () => {
    if (noteBodyPreview) noteBodyPreview.textContent = bodyTextarea.value;
  });

  console.log(
    noteTitlePreview?.textContent ?? '[no title]',
    noteBodyPreview?.textContent ?? '[no body]'
  );
};
}

function saveModalEdits() {
  if (currentEditingNote) {
    const noteTitlePreview = currentEditingNote.querySelector('.note-title h3');
    const noteBodyPreview = currentEditingNote.querySelector('.note-body p');
    const titleTextarea = document.querySelector('.full-note-modal .modal-title textarea');
    const bodyTextarea = document.querySelector('.full-note-modal .modal-body textarea');
    
    if (noteTitlePreview && titleTextarea) {
      noteTitlePreview.textContent = titleTextarea.value.trim();
    }
    if (noteBodyPreview && bodyTextarea) {
      noteBodyPreview.innerHTML = escapeHtml(bodyTextarea.value).replace(/\n/g, '<br>');
    }
  }
}


// document.querySelectorAll('.note').forEach(note => {
//   note.addEventListener('click', function() {
//     const noteTitleText = (this.querySelector('.note-title h3')?.textContent || "").trim();
//     const noteBodyText = (this.querySelector('.note-body p')?.textContent || "").trim();
//     showFullNoteModal(noteTitleText, noteBodyText, this);
//   });
// });

document.querySelectorAll('.note').forEach(note => {
  note.addEventListener('click', function() {
    const noteTitleText = this.querySelector('.note-title h3')?.textContent.trim() || '';
    const noteBodyHTML = this.querySelector('.note-body p')?.innerHTML || '';
    const noteBodyText = noteBodyHTML.replace(/<br\s*\/?>/gi, '\n');
    showFullNoteModal(noteTitleText, noteBodyText, this);
  });
});



function closeFullNoteModal() {

  saveModalEdits(); 
  backdrop.classList.remove('show');
  modal.classList.remove('show');
  // document.querySelectorAll('.full-note-modal textarea').forEach(el => el.style.height = "");
  backdrop.classList.add('hidden');
  modal.classList.add('hidden');
  titleDiv.innerHTML = '';
  bodyDiv.innerHTML = '';
};

modalCloseBtn.addEventListener('click', closeFullNoteModal);
backdrop.addEventListener('click', closeFullNoteModal);
