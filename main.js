const resetButton = document.querySelector("#reset");
const deleteNote = document.querySelector('#delete');
const updateNote = document.querySelector('#update');
const newNote = document.querySelector('#save');
//Variables Inicializadas (camelCase)
let notes = [];
let JsonNote = [];
//For showForSelect();
let arrayInfo = [];
let selected;
//-------------------->

const save = array => {
    localStorage.setItem('notes', JSON.stringify(array));
    location.reload();
}
const saveNote = () => {
    const TITLE_NOTE = document.getElementById('title').value;
    const NOTE = document.getElementById('note').value;
    if (title && note) {
        notes.push({ title: TITLE_NOTE, note: NOTE });
        save(notes);
    } else {
        alert("Write in the two fields");
    }
}
const showNotes = () => {
    if (!localStorage.length) {
        notes = [];
    } else {
        JsonNote = localStorage.getItem('notes');
        notes = JSON.parse(JsonNote);
    }
    if (!notes.length) {
        document.write(`<i>No notes to show</i>`);
    } else {
        notes.forEach((e, i) => {
            document.write(`<h4>${i + 1}. ${e.title}</h4><i> ${e.note} </i>`);
        });
    }
}
const showForSelect = array => {
    array.forEach((e, i) => {
        arrayInfo.push(`${i + 1}. ${e.title}`);
    });
    if (localStorage.length === 0) {
        alert("no Records");
    } else {
        selected = Number(prompt(`${arrayInfo.join("\n")}`));
    }
}

const deleteOne = () => {
    arrayInfo = [];
    showForSelect(notes);

    if (selected) {
        if (selected <= arrayInfo.length) {
            notes.splice(selected - 1, 1);
            save(notes);
        } else {
            alert(`Record N°${selected} , doesn't exist, please check.`);
            deleteOne();
        }
    }
}

const updateOne = () => {
    arrayInfo = [];
    showForSelect(notes);
    if (selected) {
        if (selected <= arrayInfo.length) {
            const TITLE_NOTE = notes[selected - 1].title;
            const NOTE = prompt("Write the new note");
            notes.splice(selected - 1, 1, { title: TITLE_NOTE, note: NOTE });
            save(notes);
        } else {
            alert(`Record N°${selected} , doesn't exist, please check.`);
            updateOne();
        }
    }
}
resetButton.addEventListener('click', () => {
    if (confirm("Are you shure?")) {
        localStorage.clear();
        notes = [];
        JsonNote = [];
        location.reload();
    }
});
newNote.addEventListener('click', saveNote);
deleteNote.addEventListener('click', deleteOne);
updateNote.addEventListener('click', updateOne);
showNotes();