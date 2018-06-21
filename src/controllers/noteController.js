const Note = require('../entities/Note');
const fs = require('fs');
const notes = JSON.parse(fs.readFileSync('./resources/notesMock.json'));

function findAll(req, res){
    res.json(notes);
}

function findNote(id){
    return notes.filter(note => parseInt(note.id) === parseInt(id))[0];
}

function findById(req, res){
    const id = req.params.id;
    if( id !== null){
        const note = findNote(req.params.id);
        if(note !== null && typeof note == 'object'){
            res.status(200);
            res.json(findNote(id));
        }else{
            res.status(404);
            res.json({response: 'Note not found.'});
        }
    }else{
        res.json({response: 'Id not valid.'});
    }
}

function findFavorites(req, res){
    res.json(notes.filter(note => note.favorite == true));
}

function markFavorite(req, res){
    const id = req.params.id;
    if(id !== null) {
        const note = findNote(req.params.id);
        if(note !== null && typeof note == 'object'){
            const index = notes.indexOf(note);
            note.favorite = true;
            notes[index] = note;
            res.status(202);
            res.json({response: 'Note marked as favorite.'})
        }else{
            res.status(404);
            res.json({response: 'Note not found.'});
        }
    }else{
        res.status(404);
        res.json({response: 'Id not valid.'});
    }
}

function createNote(req, res){
    if(req.text !== null){
        const notesSorted = notes.sort((a, b) =>{
            if(a.id < b.id){
                return -1;
            }else {
                return 1;
            }
        });
        const idToNewNote = parseInt(notesSorted[notesSorted.length-1].id + 1);
        console.log(req.body);
        const newNote = new Note(
            idToNewNote,
            req.body.text);
        notes.push(newNote);
        res.status(202);
        res.json({response: 'Note added succesfully.'});

    }else{
        res.status(404);
        res.json({response: 'Text not valid.'});
    }
}

function help(req,res){
    res.status(200);
    res.json({  help: "http://localhost:8090/api/help",
                findAll: {
                    path: "http://localhost:8090/api/note",
                    in: "None.",
                    out: "All the notes"},
                findById: {
                    path: "http://localhost:8090/api/note/:id",
                    in: "Id of the note.",
                    out: "The specified note."},
                findFavorites: {
                    path: "http://localhost:8090/api/favorite",
                    in: "None",
                    out: "Notes marked as favorite."},
                markFavorite: {
                    path: "http://localhost:8090/api/favorite/:id",
                    in: "Id of the note.",
                    out: "Succesful or unsuccesful messaje."} ,
                createNote: {
                    path: "http://localhost:8090/api/newNote",
                    in: {
                        schema: "{'text' : 'Text for the new message.'}"
                    },
                    out: "Succesful or unsuccesful messaje."}
    });
}

module.exports = {
    findAll,
    findById,
    findFavorites,
    markFavorite,
    createNote,
    help
}