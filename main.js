//Resetear el localstorage
let resetButton = document.querySelector("#reset");
let newNote = document.querySelector('#save');
let deleted = document.querySelector('#delete');
let act = document.querySelector('#update');

let resetAll = () => { if (confirm("Estas seguro de borrar todo?")) { localStorage.clear(); } return location.reload(); }
resetButton.addEventListener('click', resetAll);

let saveNote = () => {
    let title = document.getElementById("title").value;
    let note = document.getElementById("note").value;
    if (title && note) {
        localStorage.setItem(title, note);
        alert("Se ha guardado satisfactoriamente");
    } else {
        alert("Por favor, escribir en los dos campos");
    }

    return location.reload();
}


if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        let locate = localStorage.key(i);
        let note = localStorage.getItem(locate);
        document.write(`<h3>${i + 1}. ${locate}</h3> <i>${note}</i>`);
    }
} else { document.write(`<i>No hay notas que mostrar</i>`); }

let deleteOne = () => {
    let notesArray = [];
    if (localStorage.length === 0) {
        alert("No hay registros!");
        return 0;
    } else {
        alert("Seleccione el numero correspondiente de la nota que desea eliminar");
        for (let i = 0; i < localStorage.length; i++) {
            notesArray.push(`${i + 1}. ${localStorage.key(i)}`);
        }
    }
    let selected = prompt(`${notesArray.join("\n")}`);
    if (selected) {
        if (selected <= localStorage.length) {
            const titleDeleted = localStorage.key(selected - 1);
            localStorage.removeItem(localStorage.key(selected - 1));
            alert(`Se ha eliminado la nota N°${selected} cuyo título era "${titleDeleted}"`);
            if (confirm("Desea eliminar otra nota?")) {
                deleteOne();
            } else {
                location.reload();
            }
        } else {
            alert(`El registro N°${selected} no existe, por favor verificar.`);
            return deleteOne();
        }
    } else {
        return location.reload();
    }

}

let updateNote = () => {
    let notesArray = [];
    if (localStorage.length === 0) {
        alert("No hay registros!");
        return 0;
    } else {
        alert("Seleccione el numero correspondiente de la nota que desea actualizar");
        for (let i = 0; i < localStorage.length; i++) {
            notesArray.push(`${i + 1}. ${localStorage.key(i)}`);
        }
    }
    let selected = prompt(`${notesArray.join("\n")}`);
    let newNote = prompt("Nuevo contenido de la nota");
    if (selected) {
        if (selected <= localStorage.length) {
            localStorage.setItem(localStorage.key(selected - 1), newNote);
            alert(`Se ha modificado la nota N°${selected}`);
            if (confirm("Desea actualizar otra nota?")) {
                updateNote();
            } else {
                location.reload();
            }
        } else {
            alert(`El registro N°${selected} no existe, por favor verificar.`);
            return updateNote();
        }
    } else {
        return location.reload();
    }



}


act.addEventListener('click', updateNote);
deleted.addEventListener('click', deleteOne);
newNote.addEventListener('click', saveNote);