const resetButton = document.querySelector('#reset');
const deleteNote = document.querySelector('#delete');
const updateNote = document.querySelector('#update');
const newNote = document.querySelector('#save');
//Variables Inicializadas (camelCase)
let notes = [];
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
    if (!(TITLE_NOTE && NOTE)) {
        alert('Write in the two fields');
    } else {
        notes.push({ title: TITLE_NOTE, note: NOTE });
        save(notes);
    }
}
const showNotes = () => {
    if (!localStorage.length) {
        notes = [];
    } else {
        const JSON_NOTE = localStorage.getItem('notes');
        notes = JSON.parse(JSON_NOTE);
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
        alert('no Records');
    } else {
        selected = Number(prompt(`${arrayInfo.join('\n')}`));
    }
}
const deleteOne = () => {
    arrayInfo = [];
    showForSelect(notes);
    if (!(selected <= arrayInfo.length)) {
        alert(`Record N°${selected} , doesn't exist, please check.`);
        deleteOne();
    } else if (selected) {
        notes.splice(selected - 1, 1);
        save(notes);
    }
}
const updateOne = () => {
    arrayInfo = [];
    showForSelect(notes);
    if (!(selected <= arrayInfo.length)) {
        alert(`Record N°${selected} , doesn't exist, please check.`);
        updateOne();
    } else if (selected) {
        const TITLE_NOTE = notes[selected - 1].title;
        const NOTE = prompt('Write the new note');
        (!NOTE) ? alert('Empty field') : notes.splice(selected - 1, 1, { title: TITLE_NOTE, note: NOTE });
        save(notes)
    }
}
resetButton.addEventListener('click', () => {if (confirm('Are you sure?'))localStorage.clear(),location.reload();});
newNote.addEventListener('click', saveNote);
deleteNote.addEventListener('click', deleteOne);
updateNote.addEventListener('click', updateOne);
showNotes();