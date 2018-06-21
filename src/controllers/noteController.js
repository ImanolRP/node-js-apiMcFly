const Note = require('../entities/Note');
const fs = require('fs');
const notes = JSON.parse(fs.readFileSync('./resources/notesMock.json'));

function findAll(req,res){
    res.json(notes);
}

function findNote(id){
    return notes.filter(note => parseInt(note.id) === parseInt(id))[0];
}

function findById(req,res){
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

function findFavorites(req,res){
    res.json(notes.filter(note => note.favorite == true));
}

function markFavorite(req,res){
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

module.exports = {
    findAll,
    findById,
    findFavorites,
    markFavorite
}