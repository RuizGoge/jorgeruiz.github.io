let resetButton = document.querySelector("#reset");
let deleted = document.querySelector('#delete');
let upd = document.querySelector('#update');
let newNote = document.querySelector('#save');
//Variables Inicializadas
let notes = [];
let JsonNote = [];
//For showForSelect
let arrayInfo = [];
let selected;
//-------------------->

const save = array => {
    localStorage.setItem('notes', JSON.stringify(array));
    location.reload();
}
const saveNote = () => {
    const title = document.getElementById('title').value;
    const note = document.getElementById('note').value;
    if (title && note) {
        notes.push({ title: title, note: note });
        save(notes);
    } else {
        alert("Write in the two fields");
    }
}
const showNotes = () => {
    if (localStorage) {
        JsonNote = localStorage.getItem('notes');
        notes = JSON.parse(JsonNote);
    }
    if (!notes.length) {
        document.write(`<i>No notes to show</i>`);
    } else {
        let i = 1;
        notes.forEach(e => {
            document.write(`<h4>${i}. ${e.title}</h4><i> ${e.note} </i>`);
            i++;
        });
    }
}
const showForSelect = array => {
    let i = 1;
    array.forEach(e => {
        arrayInfo.push(`${i}. ${e.title}`);
        i++;
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
    let title;
    let note;
    if (selected) {
        if (selected <= arrayInfo.length) {
            title = notes[selected - 1].title;
            note = prompt("Write the new note");
            notes.splice(selected - 1, 1, { title: title, note: note });
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
deleted.addEventListener('click', deleteOne);
upd.addEventListener('click', updateOne);
showNotes();