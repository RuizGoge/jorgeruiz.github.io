//Resetear el localstorage
let resetButton = document.querySelector("#reset");
let resetAll = () => { if (confirm("Estas seguro de borrar todo?")) { localStorage.clear(); } return location.reload(); }
let deleted = document.querySelector('#delete');
let upd = document.querySelector('#update');
let newNote = document.querySelector('#save');
let noteArrays = [];

let saveNote = () => {
    let title = document.getElementById("title").value;
    let note = document.getElementById("note").value;
    let id = noteArrays.length + 1;
    if (title && note) {
        noteArrays.push({ id, title, note });
        alert("Se ha guardado satisfactoriamente");
        location.reload();
    } else {
        alert("Por favor, escribir en los dos campos");
    }
    noteArrays = JSON.stringify(noteArrays);
    localStorage.setItem('notes', noteArrays);
    return noteArrays = JSON.parse(noteArrays);
}
let verify = () => {
    // ésta funcion verifica si el array existe, de ser asi lo llena con lo que haya en el localStorage.
    if (localStorage.length > 0) {
        let newArray = localStorage.getItem('notes');
        noteArrays = JSON.parse(newArray);
    } else {
        return 0;
    }
}
let showNotes = () => {
    if (localStorage.length) {
        for (let i = 0; i < noteArrays.length; i++) {
            document.write(`<h3>${i + 1}. ${noteArrays[i].title}</h3> <i>${noteArrays[i].note}</i>`);
        }
    }
    if (noteArrays.length === 0) {
        document.write(`<i>No hay notas que mostrar</i>`);
    }
}
let deleteOne = () => {
    let arrayInfo = [];
    if (localStorage.length === 0) {
        alert("No hay registros!");

        return 0, location.reload();
    } else {
        alert("Seleccione el numero correspondiente de la nota que desea eliminar");
        for (let i = 0; i < noteArrays.length; i++) {
            arrayInfo.push(`${i + 1}. ${noteArrays[i].title}`);
        }
        let selected = prompt(`${arrayInfo.join("\n")}`);
        if (selected) {
            if (selected <= arrayInfo.length) {
                noteArrays.splice(selected - 1, 1);
                noteArrays = JSON.stringify(noteArrays);
                localStorage.setItem('notes', noteArrays);
                return noteArrays = JSON.parse(noteArrays), location.reload();
            } else {
                alert(`El registro N°${selected} no existe, por favor verificar.`);
                return deleteOne();
            }
        } else {
            return location.reload();
        }

    }
}
let updateOne = () => {
    let arrayInfo = [];
    if (localStorage.length === 0) {
        alert("No hay registros!");
        return 0, location.reload();
    } else {
        alert("Seleccione el numero correspondiente de la nota que desea actualizar");
        for (let i = 0; i < noteArrays.length; i++) {
            arrayInfo.push(`${i + 1}. ${noteArrays[i].title}`);
        }
        let selected = prompt(`${arrayInfo.join("\n")}`);
        let id = noteArrays[selected - 1].id;
        let title = noteArrays[selected - 1].title;
        if (selected) {
            if (selected <= arrayInfo.length) {
                let note = prompt("Escribir la nueva nota");
                noteArrays.splice(selected - 1, 1, { id, title, note });
                noteArrays = JSON.stringify(noteArrays);
                localStorage.setItem('notes', noteArrays);
                return noteArrays = JSON.parse(noteArrays), location.reload();
            } else {
                alert(`El registro N°${selected} no existe, por favor verificar.`);
                return deleteOne();
            }
        } else {
            return location.reload();
        }
    }
}
newNote.addEventListener('click', saveNote);
deleted.addEventListener('click', deleteOne);
upd.addEventListener('click', updateOne);
resetButton.addEventListener('click', resetAll);
verify();
showNotes();