const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});


notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      
      const result = json.filter((note) => note.note_id !== noteId);

     
      writeToFile('./db/db.json', result);

      
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


notes.post('/', (req, res) => {
  console.log(req.body);

  const { noteTitle, noteBody } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle: req.body.noteTitle,
      noteBody: req.body.noteBody,
      note_id: uuidv4(),
    };

    console.log('Adding note: '+newNote.noteTitle+' '+newNote.noteBody+' '+newNote.note_id);
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
//module.exports = notes;
